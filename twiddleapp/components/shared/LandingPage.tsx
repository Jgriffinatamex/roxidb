import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Image from "next/image"


const LandingPage = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row gap-5 p-5">
        <div className="flex justify-center ">
            <Image 
            src='/assets/brenda.svg'
            alt="Logo"
            width={400}
            height={400}
            className="w-1/2 lg:w-full rounded-full"
            />
        </div>
        <div className="flex flex-col items-center lg:items-start">
            <h1 className="font-extrabold text-light-1 text-4xl mb-5 lg:mb-5 text-center lg:text-left">
                Welcome to Droogger
            </h1>
            <p className="text-light-1 text-xl lg:text-2xl text-center lg:text-left">A Different Place</p>
            <p className="text-light-1 text-xl lg:text-2xl text-center lg:text-left">No memes, no algorithms</p>
            <p className="text-light-1 text-xl lg:text-2xl mb-5 text-center lg:text-left">Old School Social Media</p>
            <SignInButton>
                <button className="lg:w-full text-white mx-5 my-2 lg:mx-0 lg:my-2 px-6 py-2 rounded-full bg-green-500 hover:bg-slate-300">
                    Log In
                </button>
            </SignInButton>
            <SignUpButton>
                <button className="lg:w-full text-dark-1 mx-5 my-2 lg:mx-0 lg:my-2 px-6 py-2 rounded-full bg-white hover:bg-green-300">
                    Sign Up
                </button>
            </SignUpButton> 
        </div>
    </div>
    </>
  )
}

export default LandingPage