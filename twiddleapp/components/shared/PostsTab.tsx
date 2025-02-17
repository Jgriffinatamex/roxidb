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
                    const isOwnder = await isPostByUser(userInfo?._id, post?._id)
                    return(
                        <PostCard/>
                    )
                }
                )}
            </section>
        </>
    )
}

export default PostsTab;
