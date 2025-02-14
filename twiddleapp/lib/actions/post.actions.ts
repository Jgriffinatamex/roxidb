'use server'
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Group from "../models/group.model";
import { group } from "console";

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
export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;

    const PostsQuery = Post.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({
            path: 'author',
            model: User,
        })
        .populate({
            path: 'group',
            model: Group,
        })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: '_id name parentId image',
            },
        })
        .populate({
            path: 'repostOf',
            populate: {
                path: 'author',
                model: User,
                select: '_id name image',
            },
        });

    const totalPostsCount = await Post.countDocuments({
        parentId: { $in: [null, undefined] },
    });

    const posts = await PostsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext }
};