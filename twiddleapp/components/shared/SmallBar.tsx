'use client'
import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import Image from "next/image"
//import Link from "next/link"
import { useRouter } from "next/navigation"
import SmallPostButton from "./smallPostButton"


const SmallBar = () => {

  const sidebarLogo = () => {
    const router = useRouter()
    return(
      <div 
        onClick={() => router.push('/')}
        className="
          rounded-full
          h-20
          w-20
          p-4
          flex
          items-center
          justify-center
          cursor-pointer
          transition"
      >
        <Image src='/assets/brenda.svg' alt="logo" width={75} height={75}/>
      </div>
    )
  }
  return (
    <>
      <nav className="smallbar">
        {sidebarLogo()}
        <SmallPostButton/>
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

export default SmallBar