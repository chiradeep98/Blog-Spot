const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    coverImageUrl: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodels',
    }
}, {timestamp: true}
);

const blogModel = mongoose.model('blogmodels', blogSchema);


module.exports = blogModel;