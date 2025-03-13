'use client'

import Image from "next/image";
import { BsShare } from "react-icons/bs";

interface Props{
    postPath: string;
}
const SharePostButton = ({
    postPath,
}: Props) => {
    const copyPostUrl = () => {
        const domain = window.location.origin
        const postUrl = domain + postPath
        navigator.clipboard.writeText(postUrl)
        .then(() => {
            alert('Post has been copied')
        })
        .catch(err => {
            console.error('Failed to copy', err)
        });
    }
    return(
        <>
            {/* <Image
                src='/assets/share.svg'
                alt="share"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
                onClick={copyPostUrl}
            /> */}
            <div className="flex gap-1" onClick={copyPostUrl}>
                <BsShare size={20} color="gray"/>
                <p className="text-light-1 text-small-regular">Share</p>
            </div>
        </>
    )
}

export default SharePostButton;