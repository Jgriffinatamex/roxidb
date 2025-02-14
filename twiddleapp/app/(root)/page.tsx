import LandingPage from "@/components/shared/LandingPage";
import { fetchPosts } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home({
  searchParams,
}: { searchParams: {[key: string]: string | undefined };
}) {
  
  const user = await currentUser()
  if (!user) {
    return(
      <>
        <LandingPage/>
      </>
    )
  }
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await fetchPosts( searchParams.page ? +searchParams.page : 1 , 30);
  return(
    <>
    <div className="head-text">Hello</div>
    </>
  )
}
