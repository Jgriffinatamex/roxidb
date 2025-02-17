'use client'

import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"


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
                className={`bottombar_link ${isActive && 'bg-green-500'

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
      </div>
    </section>
    </>
  )
}

export default BottomBar