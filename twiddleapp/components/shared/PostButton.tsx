import { useRouter } from "next/navigation"
import { FaFeather } from "react-icons/fa";




const LargePostButton = () => {
    const router = useRouter();


  return (
    <div onClick={() => router.push('/create-post')} className="flex">
        <div 
            className="
             mt-1
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
            <FaFeather size={24} color="white" />
        </div>
        <div 
            className="
            mt-1
            hidden
            lg:block
            px-4
            py-2
            rounded-lg
            bg-transparent
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

export default LargePostButton