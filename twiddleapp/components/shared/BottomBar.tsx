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
        {
          sidebarLinks.map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route)
            if (link.route === '/profile') {
              link.route = `${link.route}/${userId}`
            }
            return(
              <Link 
                href={link.route}
                key={link.label}
                className={`bottombar_link ${isActive && 'bg-transparent'

                }`}
              >
                 <Image 
                 src={link.imgURL}
                 alt={link.label}
                 width={18}
                 height={12}
                 />
                 {/* Do I need this part here */}
                 <p className='text-light-1 text-subtle-medium'>
                  {link.label}  
                </p> 
              </Link>
            )
          })
        }
                <Link href={'/alerts'}>
        <Button size={'sm'} className="bottombar_btn w-fit">
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
        <Link href={'/create-post'}>
          <Button size={'sm'} className="bottombar_btn w-fit">
            Shout!
          </Button>
        </Link>
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