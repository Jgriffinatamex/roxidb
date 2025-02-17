'use server'

import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import { FilterQuery, model, SortOrder } from "mongoose";
import Post from "../models/post.model";
import Group from "../models/group.model";
import path from "path";

interface CreateUserParams {
    userId: String;
    email: String;
    username: String;
    name: String;
    image: String
}

export const createUser = async ({
    userId,
    email,
    username,
    name,
    image
}: CreateUserParams ): Promise<void> => {
    try {
        connectToDb()
        await User.create({
            id: userId,
            username: username?.toLowerCase(),
            name,
            email,
            image
        })
    } catch (err: any) {
        throw new Error(`Error creating user: ${err.message}`)
    }
}

export const fetchUser = async (userId: string) => {
    try {
        connectToDb()
        return await User.findOne({
            id: userId
        })
    } catch (err: any) {
        throw new Error(`Error fetching user: ${err.message}`)
    }
}
interface updateUserParams{
    userId: string;
    email?: string;
    username?: string;
    name?: string;
    bio?: string;
    path?: string;
    image?: string
}
export const updateUser = async ({
    userId,
    email,
    username,
    name,
    bio,
    path,
    image
}: updateUserParams): Promise<void> => {
    try {
        connectToDb()
        await User.findOneAndUpdate(
            {id: userId},
            {
                name,
                email,
                username,
                bio,
                path,
                image,
                onboarded: true
            }
    )
    if (path === '/profile/edit') revalidatePath(path)
    } catch (err: any) {
        throw new Error(`Error updating user info: ${err.message}`)  
    }
}
export const fetchUsers = async ({
    userId,
    searchString='',
    pageNumber = 1,
    pageSize = 20,
    sortBy='desc'
}:{
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder
}) => {
    try {
        connectToDb()
        const skipAmount = (pageNumber - 1) * pageSize
        const regex = new RegExp(searchString, 'i')
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }
        }
        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }
        const sortOptions = { createdAt: sortBy }

        const userQuery = User.find(query)
           .sort(sortOptions)
           .skip(skipAmount)
           .limit(pageSize)

        const totalUserCount = await User.countDocuments(query)
        const users = await userQuery.exec()
        const isNext = totalUserCount > skipAmount + users.length
        return { users, isNext }
    } catch (err: any) {
        throw new Error(`Error failed fetching users: ${err.message}`)
    }
}

export async function likeOrDislikePost(userId: string, postId: string, path: string) {
    try {
        connectToDb();
        // Find the user and check if they have already liked the post
        const user = await User.findOne({ id: userId });
        console.log(userId)
        if (!user) throw new Error('User not found');

        let post;

        if (user.likedPosts.includes(postId)) {
            // If the post is already liked, decrement its likes and remove it from the user's likedPosts
            post = await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: -1 } },
                { new: true} // Return the updated document
            );
            if (!post) {
                throw new Error('Post not found');
            }
            // Remove the post from the user's likedPosts array
            user.likedPosts = user.likedPosts.filter((id: any) => id.toString() !== postId);
        } else {
            // If the post is not liked, increment its likes and add it to the user's likedPosts
            post = await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: 1 } },
                { new: true} // Return the updated document
            );
            if (!post) {
                throw new Error('Post not found');
            }
            // Add the tweet to the user's likedPosts array
            user.likedPosts.push(postId);
        }
        await user.save();
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Like or Dislike failed ${error.message}`);
    }
}

export const fetchUserPosts = async (userId: string) => {
    try {
        connectToDb();
        // Find all tweets authored by the user with the given userId
        const posts = await User.findOne({id: userId}).populate({
            path: 'posts',
            model: Post,
            options: {
                sort: { createdAt: 'desc'}
            },
            // Sort tweets in descending order by createdAt
            populate:[
                {
                    path: 'group',
                    model: Group,
                    select: 'name id image _id', // Select the "name" and "_id" fields from the "Group" model
                },
                {
                    path: 'repostOf', // Populate the retweetOf field
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id name image',
                    },
                },
                {
                    path: 'children',
                    model: Post,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id',
                    },
                },
            ],
        });
        return posts;
    } catch (error) {
        console.error('Error fetcing user posts:', error)
    }
}

export const fetchUserReplies = async (userId: string) => {
    try {
        connectToDb();
        // Find all replies authored by the user with the given userId
        const replies = await User.findOne({ id: userId }).populate({
            path: 'replies',
            model: Post,
            populate: [
                {
                    path: 'group',
                    model: Group,
                    select: 'name id image _id',// Select the "name", "id", "image", and "_id" fields from the "Group" model
                },
                {
                    path: 'children',
                    model: Post,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id', // Select the "name", "image", and "id" fields from the "User" model
                    },
                },
            ],
        });
        return replies
    } catch (error: any) {
        console.error("Error fetching user replies:", error);
      throw error;
    }
}