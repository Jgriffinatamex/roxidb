'use client'
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea} from "../ui/textarea";
import { PostValidation } from "@/lib/validations/post";
import { usePathname, useRouter } from "next/navigation";
import { createPost } from "@/lib/actions/post.actions";
import { useOrganization } from "@clerk/nextjs";





interface Props {
    userId: string
}
const ShowPost = ( { userId }: Props ) => {
  const pathname = usePathname()
  const router = useRouter()
  const { organization } = useOrganization()

  const form = useForm< z.infer< typeof PostValidation> >({
    resolver: zodResolver(PostValidation),
    defaultValues:{
      post: '',
      accountId: userId
    }
  })

  const onSubmit = async (values: z.infer< typeof PostValidation> ) => {
    await createPost({
      text: values.post,
      author: userId,
      path: pathname,
      groupId: organization ? organization.id : null
    })
    router.push('/')
  }
  return (
    <>
    <Form {...form}>
      <form 
        className="mt-1 flex flex-col justify-start gap-10" 
        onSubmit={ form.handleSubmit(onSubmit)}
      >
        <FormField 
            control={form.control}
            name="post"
            render={ ( {field} ) => (
              <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2"> 
                  </FormLabel>
                    <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                      <Textarea 
                        rows={5}
                          {...field}
                      />
                    </FormControl>
                    <FormMessage/>
              </FormItem>
            )} 
        />
            <Button type="submit" className="w-fit user-card_btn">
              Post
            </Button>
      </form>
    </Form>
    </>
  )
}

export default ShowPost