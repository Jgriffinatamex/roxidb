'use server'

import Group from "../models/group.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

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
            const createdGroup = await newGroup.save();
            //update user model
            user.groups.push(createdGroup._id)
            await user.save()
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
    };