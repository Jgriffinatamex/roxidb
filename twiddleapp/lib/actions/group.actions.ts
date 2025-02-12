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