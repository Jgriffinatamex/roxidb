'use client'

import { likeOrDislikePost } from "@/lib/actions/user.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
    postId: string;
    currentUserId: string;
    likes: number;
    liked: boolean
}

const PostLikeButton = ({
    postId,
    currentUserId,
    likes,
    liked
}: Props) => {
    const path = usePathname()

    const handleLike = async () => {
        try {
            await likeOrDislikePost(currentUserId, postId, path);
        } catch (error: any) {
            console.error('Failed to Like', error);
        }
    }
    return(
        <>
            <Image
                src={liked ? '/assets/heart-red.svg': '/assets/heart.svg'}
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
                onClick={handleLike}
            />
            {likes > 0 && (
                <p className="ml-[15px] rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {likes}
                </p>
            )}
        </>
    )
}

export default PostLikeButton;