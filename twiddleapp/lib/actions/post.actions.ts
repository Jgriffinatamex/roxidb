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

interface RepostParams {
    userId: string;
    postId: string;
    path: string;
    groupId: string | null;
}
export const repostPost = async ({
    userId,
    postId,
    path,
    groupId,
}: RepostParams) => {
    try {
        connectToDb();
        const user = await User.findById(userId);
        if (!user) throw new Error('No such user');

        const originalPost = await Post.findById(postId);
        if (!originalPost) throw new Error('No such post');

        if (user.reposts.includes(postId)) {
            throw new Error('Already reposted ')
        }
        await createPost({
            text: originalPost.text,
            repostOf: postId,
            author: userId,
            path,
            groupId
        })

        user.reposts.push(postId)
        await user.save();

        revalidatePath(path)
    } catch ( error: any ) {
        throw new Error(`Repost failed ${error.message}`)
    }
}