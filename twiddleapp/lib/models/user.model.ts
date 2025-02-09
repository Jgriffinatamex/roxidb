'use server'
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    image: String,
    bio: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    reposts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    onboarded:{
        type: Boolean,
        default: false
    },
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'  
        }
    ]
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User