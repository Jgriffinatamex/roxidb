
import ShowPost from "@/components/forms/ShowPost"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"



const Page = async () => {
  const user = await currentUser()
  if(!user) return null
  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarded) redirect('/onboarding')
    return (
  <>
  <h1 className="head-text">Write something</h1>
  {/* this code is throwing an error*/}
  <ShowPost userId={ userInfo._id } />
  {/* Only plain objects can be passed to Client Components from Server Components <... userId={{buffer: ...}}>*/}
  </>
  )
}

export default Page