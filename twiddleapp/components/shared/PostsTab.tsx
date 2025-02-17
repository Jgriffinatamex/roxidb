import { fetchGroupPosts } from "@/lib/actions/group.actions"
import { isPostByUser } from "@/lib/actions/post.actions";
import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions"
import PostCard from "../cards/PostCard";

interface Props {
    currentUserId: string,
    accountId: string,
    accountType: string,
    user: {
        id: string
    }

}
interface Result{
    name: string;
    image: string,
    id: string;
    posts: {
        _id: string;
        text: string;
        parentId: string | null;
        author: {
            name: string;
            image: string;
            id: string;
        };
        group: {
            id: string;
            name: string;
            image: string;
        } | null ;
        createdAt: string;
        children: {
            author: {
                id: string;
                image: string;
            };
        }[];
        repostOf?:{
            id: string;
            text: string;
            parentId: string | null;
            author: {
                name: string;
                image: string;
                id: string;
            };
            createdAt: string;
            children: {
                author: {
                    id: string;
                    image: string;
                };
            };
        } | null;
        likes: number;
    }[];
}

const PostsTab = async ({ currentUserId, accountId, accountType, user }: Props) => {
    const userInfo = await fetchUser(user.id)
    let result: Result;
   if (accountType === 'Group') {
    result = await fetchGroupPosts(accountId)
} else {
    result = await fetchUserPosts(accountId)
}

    return(
        <>
            <section>
                {result.posts.map(async (post) => {
                    const isOwner = await isPostByUser(userInfo?._id, post?._id)
                    return(
                        <PostCard
                            key={post._id}
                            id={post._id}
                            currentUserId={currentUserId}
                            DB_userId={userInfo._id}
                            repostOf={post.repostOf}
                            parentId={post.parentId}
                            content={post.text}
                            owner={isOwner}
                            author={
                                accountType === 'User' ? { name: result.name, image: result.image, id: result.id} 
                                : {
                                    name: post.author.name,
                                    image: post.author.image,
                                    id: post.author.id,
                                }
                            }
                            group={
                                accountType === 'Group' 
                                ? { name: result.name, id: result.id, image: result.image}
                                : post.group
                            }
                            createdAt={post.createdAt}
                            comments={post.children}
                            likes={post.likes}
                            liked={ userInfo.likedPosts.includes(post._id)}
                        />
                    )
                }
                )}
            </section>
        </>
    )
}

export default PostsTab;
