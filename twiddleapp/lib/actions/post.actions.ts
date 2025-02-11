'use server'
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

interface PostParams{
    text: string;
    author: string;
    path: string;
    repostOf?: string
}

export const createPost = async ({
    text,
    author,
    path,
    repostOf
}: PostParams) => {
    try {
        connectToDb()
        const createdPost = await Post.create({
            text,
            author,
            path
        })
        await User.findByIdAndUpdate(author,{
          $push: { posts: createdPost._id}
        });
        if (repostOf) {
            await User.findByIdAndUpdate(author,{
                $push: { reposts: createdPost._id}
            });
        }
        revalidatePath(path)
        
    } catch (err: any) {
        throw new Error(`Failed to create Post ${err.message}`)
    }
}