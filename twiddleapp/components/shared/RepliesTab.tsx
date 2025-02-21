import { isPostByUser } from "@/lib/actions/post.actions";
import { fetchUser, fetchUserReplies } from "@/lib/actions/user.actions";
import PostCard from "../cards/PostCard";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
    currentUserId: string;
    accountId: string;
    user: {
        id: string
    }
}
interface Result{
    name: string;
    image: string;
    id: string;
    replies: {
        _id: string;
        text: string;
        parentId: string;
        author: {
            name: string;
            image: string;
            id: string;
        };
        group: {
            id: string;
            name: string;
            image: string;
        } | null;
        createdAt: string;
        children: {
            author: {
                id: string;
                image: string;
            };
        }[];
        likes: number;
    }[];
    

}

const RepliesTab = async ({ currentUserId, accountId, user }: Props) => {
    const userInfo = await fetchUser(user.id)
    const result: Result = await fetchUserReplies(accountId);

    return(
        <section className="mt-9 flex flex-col gap-10">
            { result.replies.map(async (reply) => 
                {
                    const isOwner = await isPostByUser(userInfo?._id, reply?._id)
                    const parentPostId: string | null = reply.parentId
                    return(
                        <div>
                            <PostCard
                            key={reply._id}
                            id={reply._id}
                            owner={ isOwner }
                            DB_userId={ userInfo?._id}
                            currentUserId={currentUserId}
                            parentId={reply.parentId}
                            content={reply.text}
                            author={{
                                name: result.name,
                                image: result.image,
                                id: result.id
                            }}
                            group={reply.group}
                            createdAt={reply.createdAt}
                            comments={reply.children}
                            likes={reply.likes}
                            liked={userInfo.likedPosts.includes(reply._id)}                
                            />
                            <Link href={`/post/${parentPostId}`}>
                                <Button size='sm' className="group-card_btn mt-5">
                                    See original Post
                                </Button>
                            </Link>
                        </div>
                    )
                })}
        </section>
    );
}
export default RepliesTab