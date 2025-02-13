'use server'
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Group from "../models/group.model";

interface PostParams{
    text: string;
    author: string;
    path: string;
    repostOf?: string;
    groupId: string | null
}

export const createPost = async ({
    text,
    author,
    path,
    repostOf,
    groupId
}: PostParams) => {
    try {
        connectToDb()
        const groupIdObject = await Group.findOne(
            { id: groupId }, 
            {_id: 1 });
        const createdPost = await Post.create({
            text,
            author,
            path,
            repostOf,
            group: groupIdObject
        })
        await User.findByIdAndUpdate(author,{
          $push: { posts: createdPost._id}
        });
        if (repostOf) {
            await User.findByIdAndUpdate(author,{
                $push: { reposts: createdPost._id}
            });
        }
        if (groupIdObject) {
            await Group.findByIdAndUpdate(groupIdObject, {
                $push: { posts: createdPost._id },
            });
        }

        revalidatePath(path)
        
    } catch (err: any) {
        throw new Error(`Failed to create Post ${err.message}`)
    }
}