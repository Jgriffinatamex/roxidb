'use client'

import { likeOrDislikePost } from "@/lib/actions/user.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';

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
    const LikeIcon = liked ? AiFillHeart : AiOutlineHeart;
    return(
        <>
            {/* <Image
                src={liked ? <AiOutlineHeart/>: '/assets/heart.svg'}
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
                onClick={handleLike}
            /> */}
            <div className='
                        flex
                        flex-row
                        items-center
                        text-neutral-500
                        gap-2
                        cursor-pointer
                        transition
                        hover:text-red-500'
                        onClick={handleLike}
                        >
                        <LikeIcon size={20} color={liked? 'red':''}/>
            </div>
            {likes > 0 && (
                <p className="ml-[5px] rounded-sm bg-dark-2 px-2 py-1 !text-tiny-medium text-light-2">
                    {likes}
                </p>
            )}
        </>
    )
}

export default PostLikeButton;