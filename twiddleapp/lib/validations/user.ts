import * as z from 'zod';

export const UserValidation = z.object({
    bio: z.string().min(10,{
        message: "Bio must be at least 10 characters long"
    }).max(1000)
})