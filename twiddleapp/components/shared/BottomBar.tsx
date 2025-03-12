'use client'


import { useAuth } from "@clerk/nextjs";

import { usePathname } from "next/navigation"
import AlertButton from "./AlertButton";
import GroupsButton from "./GroupsButton";
import ProfileButton from "./ProfileButton";
import SearchButton from "./SearchButton";
import HomeButton from "./HomeButton";
import PodcastButton from "./PodcastButton";


const BottomBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <>
    <section className="bottombar">
      <div className="bottombar_container">
        
        <HomeButton/>
        <AlertButton/>
        <GroupsButton/>
        <ProfileButton/>
        <SearchButton/>
        <PodcastButton/>

      </div>
    </section>
    </>
  )
}

export default BottomBar