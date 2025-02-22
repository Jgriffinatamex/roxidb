import { BsBellFill, BsFeather, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa' 



const LeftSidebar = () => {
    const items = [
        {
            labe: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Alerts',
            href: '/alerts',
            icon: BsBellFill
        },
        {
            label: 'Profile',
            href: '/profile/123',
            icon: FaUser
        },
        {
            label: 'Post',
            href: 'create-post',
            icon: BsFeather
        }

    ]
    return(
        <></>
        // <div className='col-span-1 h-full pr-4 md:pr-6'>
        //     <div className='flex flex-col items-end'>
        //         <div className='space-y-2 lg:w-[230px]'>
        //             {items.map((item) => (
        //                 <SidebarItem
        //                     key={item.href}
        //                     label=''
        //                     href={item.href}
        //                     icon={item.icon}
        //                 />
        //             ))}
        //         </div>
        //     </div>
        // </div>
    )
}
export default LeftSidebar;