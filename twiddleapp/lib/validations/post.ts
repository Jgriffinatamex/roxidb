import * as z from 'zod'

export const PostValidation = z.object({
    post: z.string().min(3,{
        message: 'Minimum of 3 characters'
    }),
    accountId: z.string()
})

