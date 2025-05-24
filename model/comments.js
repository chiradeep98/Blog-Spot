const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },

    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogmodels',
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodels',
    },  
}, {timestamp: true});


commentModel = mongoose.model('commentmodels', commentSchema);

module.exports = commentModel