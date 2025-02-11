'use server'


import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    repostOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    likes: {
        type: Number,
        default: 0,
    },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;