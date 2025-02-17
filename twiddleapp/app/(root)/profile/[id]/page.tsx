import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"


const Page = async ( {params}: {params: {id: string}}) => {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await fetchUser(params.id)
  //console.log(id)
  if ( userInfo?.onboarded) redirect('/onboarding')
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
      <div>
        {/* <Tabs>
          <TabList>
            <TabsTrigger>
              <Image/>
              <p></p>
            </TabsTrigger>
          </TabList>
          <TabsContent/>
          <TabsContent/>
        </Tabs> */}
      </div>
    </section>
    </>
  )
}

export default Page