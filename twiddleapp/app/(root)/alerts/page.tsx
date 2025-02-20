import { fetchUser, getActivity } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const Page = async () => {
    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(user.id)
    if(!userInfo.onboarded) redirect('/onboarding')
    const activity = await getActivity(userInfo._id)
    if(!activity) return null
    return(
        <>
            <section>
                {activity?.length>0 ? (
                    <>
                        {activity.map(act => (
                            <Link
                                key={act._id}
                                href={`/post/${act.parentId}`}
                            >
                                <article>
                                    <Image
                                        src={act.author.image}
                                        alt="Profile Image"
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />
                                    <p className="!text-small-regular text-light-1">
                                        <span className="mr-1 text-primary-500">
                                            {act.author.name}
                                        </span>
                                        {' '}replied to your post
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ):(
                    <p>No Alerts</p>
                )}
            </section>
        </>
    )
}
export default Page