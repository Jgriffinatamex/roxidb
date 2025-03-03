'use client'
import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import Image from "next/image"
//import Link from "next/link"
import { useRouter } from "next/navigation"


const TopBar = () => {

  const sidebarLogo = () => {
    const router = useRouter()
    return(
      <div 
        onClick={() => router.push('/')}
        className="
          rounded-full
          h-24
          w-24
          p-4
          flex
          items-center
          justify-center
          cursor-pointer
          transition"
      >
        <Image src='/assets/d-dark.svg' alt="logo" width={75} height={75} className="rounded-full bg-white"/>
      </div>
    )
  }
  return (
    <>
      <nav className="topbar">
        {sidebarLogo()}
        {/* <Link href='/' className="flex items-center gap-4">
          <Image src='/assets/oops.svg' alt="logo" width={75} height={75}/>
        </Link> */}
        <div>
          <p className=" head-text text-light-1">Droogger</p>
        </div>
        <div className="flex items-center gap-3">
          <SignedIn>
              <OrganizationSwitcher
                appearance={
                  {
                  baseTheme: dark,
                   elements: {
                     organizationSwitcherTrigger: 'py-2 px-4',
                   } 
                  }
                }
              />
            <UserButton/>
          </SignedIn>
        </div>
      </nav>
    </>
  )
}

export default TopBar