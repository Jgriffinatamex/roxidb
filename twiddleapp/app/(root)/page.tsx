import PostCard from "@/components/cards/PostCard";
import ShowPost from "@/components/forms/ShowPost";
import LandingPage from "@/components/shared/LandingPage";
//import Pagination from "@/components/shared/Pagination";
import { fetchPosts, isPostByUser } from "@/lib/actions/post.actions";

import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home(
//   {
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }
) {
  
    const user = await currentUser()
      if (!user) {
        return(
          <>
            <LandingPage/>
          </>
        )
      }
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    //const result = await fetchPosts( searchParams.page ? +searchParams.page : 1 , 30 );
     const result = await fetchPosts(
        1, 30 );
    return(
      <>
      <section className="mt-1 flex flex-col gap-5">
        <div className="max-md:hidden">
        <ShowPost userId={ userInfo._id } />
        </div>
      { result.posts.length === 0 ? (
        <p className="text-light-1">No posts found</p>
      ):(
        <div>
          {result.posts.map(async (post) => {
            const isOwner = await isPostByUser( userInfo?._id, post?._id)
            return (
              <div className="mt-1">
                <PostCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user.id}
                  owner={isOwner}
                  DB_userId={userInfo._id}
                  repostOf={post.repostOf}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  group={post.group}
                  createdAt={post.createdAt}
                  comments={post.children}
                  likes={post.likes}
                  liked={userInfo.likedPosts.includes(post._id)}      
                />
              </div>
            )
            }
          )}
          {/* <Pagination
            path='/'
            pageNUmber={ searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          /> */}
        </div>
      )}
      </section>
      </>
    )
  }
