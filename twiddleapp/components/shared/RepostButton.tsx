'use client'

import { repostPost } from "@/lib/actions/post.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";


interface Props {
    postId: string;
    userId: string;
    groupId: string | null;
    reposted: boolean;
}

const RepostButton = ({
    postId,
    userId,
    groupId,
    reposted,
}: Props ) => {
    const path = usePathname()

    const handleRepost = async () => {
        try {
            await repostPost({
                postId,
                userId,
                path,
                groupId,
            })
            alert('Repost successful')
        } catch (error: any) {
            if (error.message.includes('already reposted')) {
                alert('Already repost this one')
            } else {
                alert('Failed to repost')
            }
        }
    }
    return(
        <>
        <button onClick={handleRepost}>
            {reposted ? (
                <Image
                    src='/assets/reposted.svg'
                    alt='repost'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                />
            ): 
                <Image
                    src='/assets/repost.svg'
                    alt='repost'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                />
            }
        </button>
        <p className="text-small-regular text-light-1">RePost</p>
        </>
    ) 
}

export default RepostButton;