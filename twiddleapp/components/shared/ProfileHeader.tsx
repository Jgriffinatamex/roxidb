'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

interface Props{
    accountId: string,
    authUserId: string,
    name: string,
    username: string,
    imgUrl: string,
    bio: string,
    type?: 'User' | 'Group',
}
const ProfileHeader = ({ 
    accountId, 
    authUserId, 
    name,
    username,
    imgUrl,
    bio,
    type
    }:Props ) => {
    const router = useRouter()
    return(
        <>
            <div className="bg-neutral-700 h-44 relative">

                {/* <div className="absolute -bottom-16 left-4">
                <Image
                    src={imgUrl}
                    alt="Profile Image"
                    fill
                    className="rounded-full object-cover"
                />
                </div> */}
            </div>
            
           <div className="flex w-full flex-col justify-start">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-3 w-full">
                        

                        
                            <div className="relative h-20 w-20 object-cover">
                                <Image
                                    src={imgUrl}
                                    alt="Profile Image"
                                    fill
                                    className="rounded-full object-cover shadow-2xl"
                                />
                            </div>
                        
                        
                        <div className="flex-1">
                            <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                            <p className="text-base-medium text-gray-1">@{username}</p>
                        </div>
                        
                    </div>
                    <div>
                        {accountId === authUserId && type === 'User' ? (
                            <Button className="user-card_btn w-20" onClick={() => {
                                router.push(`/profile/edit/`)
                                }}>
                                    Edit Profile
                            </Button>
                        ):(
                            <Button className="bg-black text-white border border-white w-20 rounded-full">
                                Follow
                            </Button>
                        )}
                        </div>

                </div>
                <div className="mt-12 h-0.5 w-full bg-dark-2"/>
                <p className="mt-6 max-w-lg text-base-regular text-light-2">{ bio }</p>
                <div className="mt-12 h-0.5 w-full bg-dark-2"/>
                {/* {accountId === authUserId && type === 'User' && (
                    <Button className="user-card_btn w-20" onClick={() => {
                        router.push(`/profile/edit/`)
                    }}>
                        Edit Profile
                    </Button>
                )} */}
           </div>
        </>
    )
}

export default ProfileHeader