'use client' 
import { sidebarLinks } from '@/constants'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const LeftSideBar = () => {
  const pathname = usePathname()
  const {userId} = useAuth()
  return (
    <>
    <section className="leftsidebar custom-scrollbar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
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
                  className={`leftsidebar_link ${isActive && 'bg-sky-500'}`
                }
                >
                  <Image 
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                  />
                  <p className='text-light-1'>
                    {link.label}  
                  </p> 
                </Link>
              )
            }
          )
        }
        <Link href={'/alerts'}>
        <Button size={'sm'} className="group-card_btn w-full">
          Alerts
        </Button>
      </Link>
        <Link href={'/groups'}>
          <Button size={'sm'} className="group-card_btn w-full">
            Groups
          </Button>
        </Link>
        <Link href={ `/profile/${userId}`}>
          <Button size={'sm'} className="group-card_btn w-full">
            Profile
          </Button>
        </Link>
        <Link href={'/create-post'}>
          <Button size={'sm'} className="group-card_btn w-full">
            Shout!
          </Button>
        </Link>
        <Link href={'/search'}>
          <Button size={'sm'} className="group-card_btn w-full">
            Search
          </Button>
        </Link>

      </div>
    </section>
    </>
  )
}

export default LeftSideBar