'use client'
import { CommentValidation } from "@/lib/validations/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import { addCommentToPost } from "@/lib/actions/post.actions";


interface Props {
    postId: string,
    currentUserImg: string,
    currentUserId: string
}

const Comment = ({postId, currentUserImg, currentUserId}: Props) => {
    const pathname = usePathname();
    const form = useForm<z.infer<typeof CommentValidation >>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            post: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof CommentValidation>)=> {
        await addCommentToPost(postId, values.post, JSON.parse(currentUserId),pathname)
        form.reset()
    }
    return(
        <>
        <Form {...form}>
            <form 
                className="comment-form" 
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="post"
                    render = {({ field }) =>(
                        <FormItem>
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="Current User"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn">
                    Reply
                </Button>
            </form>
        </Form>
        </>
    )
}
export default Comment;