
import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { profileTabs } from "@/constants"
import Image from "next/image"
import PostsTab from "@/components/shared/PostsTab"
import RepliesTab from "@/components/shared/RepliesTab"



const Page = async ({params}: {params: {id: string}}) => {
  //const params = await props.params;
  const user = await currentUser()
  if (!user) return null
  const userInfo = await fetchUser(params.id)
  //console.log(id)
  if ( !userInfo?.onboarded) redirect('/onboarding')
  return ( 
    <>
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        type='User'
      />
      <div className="mt-9">
        <Tabs defaultValue='posts' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map(tab => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className='tab'
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === 'Posts' && (
                  <p className="ml-1 rounded-sm bg-light-4 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.posts?.length}
                  </p>
                )}
                {tab.label === 'Replies' &&  (
                  <p>
                    {userInfo?.replies?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
           value={'posts'}
           className='w-full text-light-1'
          >
            <PostsTab
             currentUserId={user.id}
             accountId={userInfo.id}
             accountType='User'
             user={user}
            />
          </TabsContent>
          <TabsContent
            value={'replies'}
            className='w-full text-light-1'
          >
            <RepliesTab
              currentUserId={user.id}
              accountId={userInfo.id}
              user={user}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section> 
    </>
  )
}

export default Page