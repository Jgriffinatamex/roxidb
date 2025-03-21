import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import UserCard from "../cards/UserCard";
import { fetchGroups } from "@/lib/actions/group.actions";
import { group } from "console";
import GroupCard from "../cards/GroupCard";





const RightSideBar = async () => {
  const user = await currentUser();
  if (!user) return null

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4
  })
  
  const suggestedGroups = await fetchGroups( { pageSize: 4} )

  return (
    <>
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1">
            Suggestions
          </h3>
      </div>
      {/* <div className="flex flex-col border border-dark-4 flex-1 justify-start rounded-lg">
          <h3 className="text-heading4-medium text-light-1">
            Users
          </h3>
          
          <div className="mt-7 flex w-[350] flex-col gap-5">
            {
              similarMinds.users.length > 0 ? (
                <>
                { similarMinds.users.map( ( person ) => 
                    <UserCard
                      key={ person.id }
                      id={ person.id }
                      name={ person.name }
                      username={ person.username }
                      imgUrl={ person.image }
                    />
                )}
                </>
              ):(
                <>
                <p className="!text-base-regular text-light-3">
                  No users found yet.
                </p>
                </>
              )
            }
          </div>
      </div> */}
      <div className="flex flex-col justify-start border border-dark-4 rpunded-lg">
          <h3 className="text-heading4-medium text-light-1">
            Groups
          </h3>
          <div className="mt-7 flex w-[350px] flex-col gap-10">
            { suggestedGroups.groups.length > 0 ? (
                <>
                  { suggestedGroups.groups.map(( group ) => 
                    <GroupCard
                      key={ group.id }
                      id={ group.id }
                      name={ group.name }
                      username = { group.username }
                      imgUrl={ group.image }
                      members={ group.members }  
                    />
                  )}
                </>
              ):(
                <>
                  <p className="text-base-regular text-light-3">
                    No Groups Yet
                  </p>
                </>
              )
            }
          </div>
      </div>
      <div className="flex flex-col justify-start border border-dark-4 rounded-lg">
          <h3 className="text-heading4-medium text-light-1">
            Users
          </h3>
          <div className="mt-7 flex w-[350] flex-col gap-5">
            {
              similarMinds.users.length > 0 ? (
                <>
                { similarMinds.users.map( ( person ) => 
                    <UserCard
                      key={ person.id }
                      id={ person.id }
                      name={ person.name }
                      username={ person.username }
                      imgUrl={ person.image }
                    />
                )}
                </>
              ):(
                <>
                <p className="!text-base-regular text-light-3">
                  No users found yet.
                </p>
                </>
              )
            }
          </div>
      </div>
    </section>
    </>
  )
}

export default RightSideBar