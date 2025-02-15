import PostCard from "@/components/cards/PostCard";
import LandingPage from "@/components/shared/LandingPage";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts, isPostByUser } from "@/lib/actions/post.actions";

import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }; 
}) {
  
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

    //const result = await fetchPosts( searchParams.page ? +searchParams.page : 1 , 3 );
    const result = await fetchPosts(
      searchParams?.page ? +searchParams.page : 1, 3 );
    return(
      <>
      <section className="mt-10 flex flex-col gap-10">
      { result.posts.length === 0 ? (
        <p className="text-light-1">No posts found</p>
      ):(
        <div>
          {result.posts.map(async (post) => {
            const isOwner = await isPostByUser( userInfo?._id, post?._id)
            return (
              <div className="mt-10">
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
                  liked={ userInfo.likedPosts.includes(post._id)}      
                />
              </div>
            )
            }
          )}
          <Pagination
            path='/'
            pageNUmber={ searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          />
        </div>
      )}
      </section>
      </>
    )
  }
