const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true},
    createdAt: { type: Date, default: new Date()},
    updatedAt: { type: Date, default: new Date()}
});

module.exports = mongoose.model('Post', postSchema);