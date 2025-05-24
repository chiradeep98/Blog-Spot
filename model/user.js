const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('crypto');
const {createTokenForUser} = require('../services/authentication');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        requires: true,
    },

    salt: {
        type: String,
    },

    password: {
        type: String,
        required: true,
    },

    profileImageUrl: {
        type: String,
        default: '/images/avatar.png',
    },

    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

},{timestamps: true}
);

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();

});

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error('User not Found!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest('hex');

    if(hashedPassword !== userProvidedHashedPassword) throw new Error('Password didn\'t match!');

    const token = createTokenForUser(user);
    return token;
});

const userModel = mongoose.model('usermodels', userSchema);

module.exports = userModel;