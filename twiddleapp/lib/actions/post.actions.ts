'use server'
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Group from "../models/group.model";
import { model } from "mongoose";
import path from "path";
import { any } from "zod";
import exp from "constants";

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

export const isPostByUser = async (userId: string, postId: string) => {
    try {
        connectToDb();
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        return post?.author.toString() === userId?.toString();
    } catch (error: any) {
        throw new Error(`not your post ${error.message}`);
    }
}

export const deletePost = async (userId: string, postId: string, path: string) => {
    try {
        connectToDb();
        
        // Check if the post exists and if the user is the author
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        // Check if the post belongs to the user
        const isAuthor = await isPostByUser(userId, postId);
        if (!isAuthor) throw new Error('Post not found')

        // Remove post reference from the user's posts array
        await User.findByIdAndUpdate(userId, {
            $pull: { posts: postId }
        });

        // If the post is a repost, remove it from the user's reposts array
        if (post.repostOf) {
            await User.findByIdAndUpdate(userId, {
                $pull: { reposts: post.repostOf}
            });
        }

        if (post.parentId) {
            await User.findByIdAndUpdate(userId, {
                $pull: { replies: postId} 
            });

            await Post.findByIdAndUpdate(post.parentId, {
                $pull: { children: postId }
            })
        }
        // if (post.group) {
        //     await Group.findByIdAndUpdate(post.group,{
        //         $pull: { posts: postId }
        //     })
        // }
        // Remove post reference from any group collections it might belong to
        await Group.updateMany(
            {posts: postId},
            { $pull: { posts: postId } }
        );

        // Find and delete all reposts of the post
        const reposts = await Post.find({ repostOf: postId});

        for(const repost of reposts) {
            // Remove repost reference from the user's posts array
            await User.findByIdAndUpdate(repost.author, {
                $pull: { reposts: repost._id }
            });

            // Remove repost reference from the user's reposts array
            await User.findByIdAndUpdate(repost.author,{
                $pull: { reposts: repost._id }
            });

            // Remove repost reference from any group collections it might belong to
            await Group.updateMany(
                { posts: repost._id },
                { $pull: { posts: repost._id } }
            );
            // Delete the repost
            await Post.findByIdAndDelete(repost._id)
        }
        // Remove the post from all users' reposts arrays
            await User.updateMany(
                { reposts: postId},
                { $pull: { reposts: postId } }
            );

        // Delete the original post
            await Post.findByIdAndDelete(postId);

            revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Delete failed ${error.message}`);
    }
}

export const fetchPostById = async (id:string) => {
   connectToDb();

    try {
        const post = await Post.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: '_id id name image',
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: '_id name image',     
                },
                {
                    path: 'children',
                    model: Post,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id name image',
                    },
                },
            ],
        })
        .populate({
            path: 'repostOf',// Populate the retweetOf field
            populate: {
                path: 'author',
                model: User,
                select: '_id name image',
            }, 
        })
        .populate({
            path: 'group',
            model: Group,
        })
        .exec();
        return post;

   } catch (err: any) {
    throw new Error(`Error fetching tweet: ${err.message}`);
   } 
}
export const addCommentToPost = async (
    postId: string,
    commentText: string,
    userId: string,
    path: string
) => {
    connectToDb()
    try {
        const originalPost = await Post.findById(postId)
        if (!originalPost) throw new Error('Post not found');

        const commentPost = new Post({
            text: commentText,
            author: userId,
            parentId: postId,
        });

        const savedCommentPost = await commentPost.save();
        // Update user's replies
        await User.findByIdAndUpdate(userId,{
            $push: { replies: savedCommentPost._id}
        });

        originalPost.children.push(savedCommentPost._id);
        await originalPost.save();
        revalidatePath(path);
    } catch (err: any) {
        throw new Error(`Error adding comment to tweet: ${err.message}`);
    }
};