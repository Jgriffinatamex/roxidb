import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"

const Page = async ({ params } : { params: { id: string } } ) => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(params.id)
}