import { fetchUsers } from "@/lib/actions/user.actions";

import UserCard from "../cards/UserCard";
import { currentUser } from "@clerk/nextjs/server";



const RightSideBar = async () => {
  const user = await currentUser();
  if (!user) return null

  // const similarMinds = await fetchUsers({
  //   userId: user.id,
  //   pageSize: 4
  // })

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 10
  })

  return (
    <>
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1">
            Suggestions
          </h3>
      </div>
      <div className="flex flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1">
            Groups
          </h3>
      </div>
      <div className="flex flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1">
            Users
          </h3>
          <div className="mt-7 flex w-[350]">
            {
              similarMinds.users.length > 0 ? (
                <>
                { similarMinds.users.map((person) => {
                  <UserCard 
                    key = { person.id }
                    id = { person.id }
                    name = { person.name }
                    username = { person.username }
                    imgUrl = { person.image }
                    personType = 'User'
                  />
                })}
                </>
              ):(
                <>
                <p className="!text-base-regular text-light-3">
                  No users found yet
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