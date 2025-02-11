import ShowPost from "@/components/forms/ShowPost"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"



const Page = async () => {
    const user = await currentUser()
    if (!user) return null
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding') 
  return (
    <>
    <h1 className="head-text">Create Post</h1>
    <ShowPost userId = { userInfo._id }/>
    </>
  )
}

export default Page