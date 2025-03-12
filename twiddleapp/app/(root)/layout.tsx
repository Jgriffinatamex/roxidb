
import { Inter } from "next/font/google";
import { Metadata } from "next";
import '@/app/globals.css';
import { ClerkProvider } from "@clerk/nextjs";

import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import { currentUser } from "@clerk/nextjs/server";
import SmallBar from "@/components/shared/SmallBar";


export const metadata: Metadata = {
    title: "Droogger",
    description: "A different place",
    icons: {
        icon:'/assets/brenda.svg'
    }
}

const inter = Inter({
    subsets: ["latin"]
})

// export default async function Layout(props: { children: ReactNode: params: Promise<{ id: string }>}){
//     const { children, params } = props;
//     const { id } = await params;

export default async function RootLayout({ children } :
    Readonly<{
        children: React.ReactNode
    }>
){
    const user = await currentUser()
    if (!user) {
        return(
            <>
            <html lang='en'>
                <ClerkProvider >
                    <body>
                        <main className={`${inter.className} bg-dark-1` }>
                            <div className="w-full flex justify-center items-center min-h-screen">
                                { children }
                            </div>
                        </main>
                    </body>
                </ClerkProvider>
                
            </html>
        </>
        )
    }
    return (
        <>
            <html lang='en'>
                <ClerkProvider >
                    <body>
                        <main className={`${inter.className}`}>
                            <TopBar />
                            <SmallBar/>
                                <main className="flex">
                                    <LeftSideBar />
                                        <section className="main-container">
                                            <div className="w-full max-w-4xl">
                                                { children }
                                            </div>
                                        </section>
                                    <RightSideBar />
                                </main>
                            <BottomBar />
                        </main>
                    </body>
                </ClerkProvider>
            </html>
        </>
    )
}
