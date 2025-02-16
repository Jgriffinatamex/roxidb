import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import Image from "next/image"
import Link from "next/link"


const TopBar = () => {
  return (
    <>
      <nav className="topbar">
        <Link href='/' className="flex items-center gap-4">
          <Image src='/assets/logo.svg' alt="logo" width={75} height={75}/>
        </Link>
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