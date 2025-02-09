import LandingPage from "@/components/shared/LandingPage";
import TopBar from "@/components/shared/TopBar";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return(
      <>
        <LandingPage/>
      </>
    )
  }
  return(
    <>
    <div>Hello</div>
    </>
  )
}
