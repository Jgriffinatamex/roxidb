import PostCard from "@/components/cards/PostCard"
import Comment from "@/components/forms/Comment"
import { fetchPostById, isPostByUser } from "@/lib/actions/post.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"


const Page = async ({params}: {params: {id: string}}) => {
    const user = await currentUser()
    if(!user) return null
    
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')

    const post = await fetchPostById(params.id)
    if (!post) {
        return (
            <div className="flex flex-col items-center text-light-1">
                <h1 className="mt-10 mb-10 text-heading1-bold">The tweet no longer exists</h1>
                <Image
                    src='/assets/oops.svg'
                    alt="oops"
                    width={200}
                    height={200}
                />
            </div>
        )
    }
    {
        const isOwner = await isPostByUser(userInfo?._id, post._id)

        return(
            <section className="relative">
                <div>
                    <PostCard
                        key={post._id}
                        id={post._id}
                        DB_userId={userInfo?._id}
                        repostOf={post.repostOf}
                        currentUserId={user?.id}
                        parentId={post.parentId}
                        content={post.text}
                        author={post.author}
                        group={post.group}
                        createdAt={post.createdAt}
                        comments={post.children}
                        likes={post.likes}
                        liked={ userInfo.likedPosts.includes(post._id) }
                        owner={isOwner}
                    />
                </div>
                <div className="mt-7">
                    <Comment
                        postId = {post.id}
                        currentUserImg = {userInfo.image}
                        currentUserId = {JSON.stringify(userInfo._id)}
                    />
                </div>

                <div className="mt-10">
                    {post.children.map(async (child: any) => 
                    {
                        const isOwner = await isPostByUser(userInfo?._id, child?._id)
                        return(
                            <PostCard
                                key={child._id}
                                id={child._id}
                                DB_userId={userInfo?._id}
                                currentUserId={user?.id || ''}
                                parentId={child.parentId}
                                content={child.text}
                                author={child.author}
                                group={child.group}
                                createdAt={child.createdAt}
                                comments={child.children}
                                isComment
                                owner={isOwner}
                                likes={child.likes}
                                liked={userInfo.likedPosts.includes(child._id)}
                            />
                        )
                    }
                    )}

                </div>
            </section>
        )
    }
}
export default Page