
import UserCard from "@/components/cards/UserCard";
import PostsTab from "@/components/shared/PostsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { groupTabs } from "@/constants";
import { fetchGroupDetails } from "@/lib/actions/group.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";


const Page = async ( {params}: {params: {id: string;}} ) => {
    const user = await currentUser();
    if (!user) return null;
    

    const groupDetails = await fetchGroupDetails(params.id);
    console.log(groupDetails)
    return(
        <section>
            <ProfileHeader
                accountId={groupDetails._id}
                authUserId={user.id}
                name={groupDetails.name}
                username={groupDetails.username}
                imgUrl={groupDetails.image}
                bio={groupDetails.bio}
                type="Group"
            />
            <div className="mt-9">
                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="tab">
                        {groupTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label === 'Post' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {groupDetails.posts.length}
                                    </p>
                                )}
                                {tab.label === 'Members' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {groupDetails.members.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                        <TabsContent value="posts" className="w-full text-light-1">
                            <PostsTab
                                currentUserId={user.id}
                                accountId={groupDetails._id}
                                accountType="Group"
                                user={user}
                            />
                        </TabsContent>
                        <TabsContent value="members" className="mt-9 w-full text-light-1">
                            <section className="mt-9 flex flex-col gap-10">
                                {groupDetails.members.map((member: any) => (
                                    <UserCard
                                        key={member.id}
                                        id={member.id}
                                        name={member.name}
                                        username={member.username}
                                        imgUrl={member.image}
                                    />
                                ))}
                            </section>
                        </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}

export default Page;