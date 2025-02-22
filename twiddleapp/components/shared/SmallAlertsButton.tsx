import { useRouter } from "next/navigation"
import { BsBell, BsBellFill } from "react-icons/bs";




const SmallAlertButton = () => {
    const router = useRouter();


  return (
    <div onClick={() => router.push('/alerts')}>
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
            <BsBell size={24} color="white" />
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
                Alerts
            </p>
        </div>
    </div>
  )
}

export default SmallAlertButton