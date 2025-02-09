'use server'

import User from "../models/user.model"
import { connectToDb } from "../mongoose"

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