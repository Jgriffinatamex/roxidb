
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/SearchBar";
import { fetchGroups } from "@/lib/actions/group.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const Page = async ({
    searchParams,
}:{
    searchParams: {[key: string]:string | undefined}
}) => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding');

    const result = await fetchUsers({
        userId: user.id,
        searchString: searchParams.q, 
        pageNumber: searchParams?.page ? searchParams.page : 1,
        pageSize: 25,
    })

    const groupsResult = await fetchGroups({
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? searchParams.page : 1,
        pageSize: 25
    })
    return(
       <>
        <section>
        <h1 className="head-text mb-10">Search</h1>

        <SearchBar routeType="search"/>
        <div>
        
        </div>
        <div>
        </div>
        {/* <Pagination/>     */}
        </section>   
       </>
       
    )
}

export default Page