import * as z from "zod";

export const CommentValidation = z.object({
    post: z.string().min(3, {
        message: 'Minimum 3 characters!!!'
    })
})