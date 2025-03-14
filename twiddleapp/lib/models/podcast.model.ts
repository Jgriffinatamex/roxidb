'use server'


import mongoose from "mongoose"

const podcastSchema = new mongoose.Schema({
    podId: {
        type: String,
    },
    podcastTitle: {
        type: String,
    },
    podcastDescription: {
        type: String,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: String
});

const Podcast = mongoose.models.Post || mongoose.model('Post', podcastSchema);

export default Podcast;