import { useRouter } from "next/navigation"
import { BsChat, BsChatFill } from "react-icons/bs";
import { FaFeather } from "react-icons/fa";



const SmallPostButton = () => {
    const router = useRouter();


  return (
    <div onClick={() => router.push('/create-post')}>
        <div 
            className="
             mt-1
             lg:hidden
             rounded-lg
             h-14
             w-14
             p-4
             flex
             items-center
             justify-center
             bg-transparent
             hover:bg-opacity-80
             transition
             cursor-pointer
            "
        >
            <BsChatFill size={24} color="white" />
        </div>
        <div 
            className="
            mt-1
            hidden
            lg:block
            px-4
            py-2
            rounded-lg
            bg-sky-500
            hover:bg-opacity-90
            cursor-pointer
            transition
            "
        >
            <p 
                className="
                 hidden
                 lg:block
                 text-center
                 font-semibold
                 text-white
                 text-[20px]">
                Post
            </p>
        </div>
    </div>
  )
}

export default SmallPostButton