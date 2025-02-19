'use server'

import { FilterQuery, model, SortOrder } from "mongoose";
import Group from "../models/group.model";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import path from "path";

interface createGroupParams {
    id: string;
    name: string;
    username: string;
    image: string;
    createdById: string;
}
export const createGroup = async (
    {
        id,
        name,
        username,
        image,
        createdById,

    }: createGroupParams) => {
        try {
            connectToDb();
            const user = await User.findOne({ id: createdById })
            if (!user) {
                throw new Error('Could not find user')
            }
            const newGroup = new Group({
                id,
                name,
                username,
                image,
                createdById: user._id,
            });
            await newGroup.save();
            //update user model
            //user.groups.push(createdGroup._id)
            //await user.save()
        } catch (error) {
            console.error('failed to create group',error)
            throw error;
        }
    }

    export const addMemberToGroup = async (
        groupId: string,
        memberId: string
    ) => {
        try {
            connectToDb();
            //find the group by its id
            const group = await Group.findOne({ id: groupId });
            if (!group) {
                throw new Error('Group not found');
            }
            //find the user by its id
            const user = await User.findOne({ id: memberId });
            if (!user) {
                throw new Error('User not found');
            }

            if (group.members.includes(user._id)) {
                throw new Error('Already in group');
            }
            //add user to the group members array
            group.members.push(user._id);
            await group.save();
            //add group to the user's groups array
            user.groups.push(group._id);
            await user.save();

            return group;
        } catch (error) {
            console.error('failed to add member',error)
            throw error; 
        }
    }
    export const removeUserFromGroup = async (
        userId: string,
        groupId: string
    ) => {
        try {
            connectToDb();

            const userIdObject = await User.findOne({ id: userId }, { _id: 1 });
            const groupIdObject = await Group.findOne(
                { id: groupId },
                { _id: 1 }
            );
            if (!userIdObject) {
                throw new Error('user not found');
            }
            if (!groupIdObject) {
                throw new Error('Group not found');
            }
            //remove user from the group members array
            await Group.updateOne(
                { _id: groupIdObject._id },
                { $pull: { members: userIdObject._id} }
            );
            //remove group from the user's groups array
            await User.updateOne(
                { _id: userIdObject._id },
                { $pull:{ member: groupIdObject._id } }
            );
            return { success: true };

        } catch (error) {
            console.error('failed to remove user from group',error)
            throw error; 
        }
    }
    export const updateGroupInfo = async (
        groupId: string,
        name: string,
        username: string,
        image: string
    ) => {
        try {
            connectToDb();
            const updatedGroup = await Group.findOneAndUpdate(
                { id: groupId },
                { name, username, image }
            );
            if (!updatedGroup) {
                throw new Error('Group not found')
            }
            return updatedGroup;
        } catch (error) {
            console.error('failed to update group',error)
            throw error;   
        }
    }
    export const deleteGroup = async (groupId: string) => {
        try {
            connectToDb();

            // Find the group by its ID and delete it
            const deleteGroup = await Group.findOneAndDelete({
                id: groupId,
            });
            if (!deleteGroup) {
                throw new Error('Group not found');
            }

            // Delete all tweets associated with the group
            await Post.deleteMany({ group: groupId });

            // Find all users who are part of the group
            const groupUsers = await User.find({ groups: groupId });
            
            // Remove the group from the 'groups' array for each user
            const updateUserPromises = groupUsers.map((user) => {
                user.groups.pull(groupId);
                return user.save();
            });

            await Promise.all(updateUserPromises);

            return deleteGroup;

        } catch (error) {
            console.error('failed to delete group',error)
            throw error; 
    }
    }
    export const fetchGroups = async ({
        searchString = '',
        pageNumber = 1,
        pageSize = 20,
        sortBy = 'desc'
    }: {
        searchString?: string;
        pageNumber?: number;
        pageSize?: number;
        sortBy?: SortOrder;
    }) => {
        try {
            connectToDb();
            // Calculate the number of groups to skip based on the page number and page size.
            const skipAmount = (pageNumber - 1 ) * pageSize;
            // Create a case-insensitive regular expression for the provided search string.
            const regex = new RegExp(searchString, 'i');
            // Create an initial query object to filter groups.
            const query: FilterQuery< typeof Group > = {};

            // If the search string is not empty, add the $or operator to match either username or name fields.
            if (searchString.trim() !=='') {
                query.$or = [
                    { username: { $regex: regex } },
                    { name: { $regex: regex } },
                ];
            }
            // Define the sort options for the fetched groups based on createdAt field and provided sort order.
            const sortOptions = { createdAt: sortBy};
            // Create a query to fetch the groups based on the search and sort criteria.
            const groupsQuery = Group.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize).populate('members');
            // Count the total number of groups that match the search criteria (without pagination).
            const totalGroupsCount = await Group.countDocuments(query)

            const groups = await groupsQuery.exec();

            // Check if there are more groups beyond the current page.
            const isNext = totalGroupsCount > skipAmount + groups.length;
            return { groups, isNext};            
        } catch (error) {
            console.error('failed to fetch groups',error)
            throw error;  
        }
    }
    export const fetchGroupPosts = async ( id: string ) => {
        try {
            connectToDb()

            const groupPosts = await Group.findById(id)
            .populate({
                path: 'posts',
                model: Post,
                options: {
                    sort: {createdAt: 'desc'}
                },// Sort tweets in descending order by createdAt
                    populate: [
                        {
                            path: 'author',
                            model: User,
                            select: 'name image id', // Select the "name" and "_id" fields from the "User" model
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
                                select: 'image _id', // Select the "name" and "_id" fields from the "User" model
                            },
                        },
                    ],
            });
            return groupPosts;
        } catch (error) {
            console.error("Error fetching group posts:", error);
            throw error;
        }
    }
    export const fetchGroupDetails = async (id: string) => {
        try {
            connectToDb();

            const groupDetails = await Group.findOne({ id }).populate([
                'createdBy',
                {
                    path: 'members',
                    model: User,
                    select: 'name username image _id id',
                },
            ]);
            return groupDetails;
        } catch (error) {
            console.error("Error fetching group details:", error);
            throw error;
        }
    }