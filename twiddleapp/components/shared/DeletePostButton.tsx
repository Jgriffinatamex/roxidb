'use client'

import { deletePost } from "@/lib/actions/post.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface Props{
    userId: string;
    postId: string;
}
const DeletePostButton = ({
    userId,
    postId
}: Props) => {
    const path = usePathname()
    const handleDeletePost = async () => {
        await deletePost(userId, postId, path)
    }
    return(
        <>
        <button onClick={handleDeletePost}>
            <AiOutlineDelete size={20} color="gray"/>
            {/* <Image
                src='/assets/delete.svg'
                alt="repost"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
            /> */}
        </button>
        <p className="text-light-1 text-small-regular"> Delete</p>
        </>
    )
}

export default DeletePostButton;