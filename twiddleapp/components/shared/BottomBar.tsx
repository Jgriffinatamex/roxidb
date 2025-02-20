'use client'

import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { Button } from "../ui/button";


const BottomBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <>
    <section className="bottombar">
      <div className="bottombar_container">

        <Link href={'/alerts'}>
        <Button size={'icon'} className="bottombar_btn w-fit">
          Alerts
        </Button>
        </Link>
        <Link href={'/groups'}>
          <Button size={'sm'} className="bottombar_btn w-fit">
            Groups
          </Button>
        </Link>
        <Link href={ `/profile/${userId}`}>
          <Button size={'sm'} className="bottombar_btn w-fit">
            Profile
          </Button>
        </Link>
        {/* <Link href={'/create-post'}>
          <Button size={'sm'} className="bottombar_btn w-fit">
            Shout!
          </Button>
        </Link> */}
        <Link href={'/search'}>
          <Button size={'sm'} className="bottombar_btn w-fit">
            Search
          </Button>
        </Link>
      </div>
    </section>
    </>
  )
}

export default BottomBar