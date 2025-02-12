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
            console.log(error)
            throw error;
        }
    }