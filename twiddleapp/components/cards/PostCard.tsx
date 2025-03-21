import Image from "next/image";
import Link from "next/link";
import { formatDateString } from '@/lib/utils'; 
import PostLikeButton from "../shared/PostlikeButton";
import SharePostButton from "../shared/SharePostButton";
import RepostButton from "../shared/RepostButton";
import DeletePostButton from "../shared/DeletePostButton";
import { AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

interface Props {
  id: string;
  currentUserId: string;
  DB_userId: string;
  owner?: boolean;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  group: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author:{
      id: string;
      image: string;
    };
  }[];
  repostOf?: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    group: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }; 
  } | null
  isComment?: boolean;
  likes: number;
  liked: boolean
}
const PostCard = ({
  id,
  currentUserId,
  DB_userId,
  owner,
  content,
  author,
  group,
  createdAt,
  comments,
  isComment,
  likes,
  liked,
  repostOf
}: Props) => {
  return (
    <>
      <article 
        className={
          `flex w-full border-b border-b-dark-4 border-t-dark-4 flex-col rounded-xl 
          ${isComment ? 'px-0 xs:px-7' :'bg-dark-3 p-7 hover:bg-dark-4'}`
        }
      >
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                <Image
                  src={author.image}
                  alt="Profile Image"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>
              <div className="border-b-light-1 cursor-pointer rounded-full"/>
            </div>

            <div className="flex w-full flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-2">{author.name}</h4>
              </Link>
              <p className="text-gray-1 text-subtle-medium">{formatDistanceToNowStrict(createdAt)} ago</p>
                <p className="mt-2 text-small-regular text-light-2">{content}</p>
                <div className={`${isComment && 'mb-20'} mt-5 flex flex-col gap-3`}>
                  <div className="flex gap-1">
                    <PostLikeButton
                      postId={id}
                      currentUserId={currentUserId}
                      likes={likes}
                      liked={liked}
                    />
                    {/* <p className="text-light-1 text-small-regular">Likes</p> */}
                    <Link href={`/post/${id}`}>
                    <AiOutlineMessage size={20} color="gray"/>
                      {/* <Image
                        src='/assets/reply.svg' alt="reply" width={24} height={24} className="cursor-pointer object-contain"
                      /> */}
                    </Link>
                    <p className="text-light-1 text-small-regular">Comments</p>
                    {/* <RepostButton
                      postId={id}
                      userId={DB_userId}
                      groupId={group ? group.id : null}
                      reposted={repostOf ? true : false} 
                    />
                    <p className="text-light-1 text-small-regular">RePost</p> */}
                    {/* <SharePostButton
                      postPath={`/post/${id}`}
                    /> */}
                    {owner ? (
                      <DeletePostButton
                        userId={DB_userId}
                        postId={id}
                      />
                    ):(
                      <RepostButton
                      postId={id}
                      userId={DB_userId}
                      groupId={group ? group.id : null}
                      reposted={repostOf ? true : false} 
                    />
                    )}
                    {/* <SharePostButton
                      postPath={`/post/${id}`}
                    /> */}
                  </div>

                  <div>
                    { comments.length > 0 && (
                      <div>
                        <Link 
                          href={`/post/${id}`}
                          className="flex flex-row"
                        >
                          <p className="mt-1 mr-3 text-subtle-medium text-gray-1">
                            {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
                          </p>
                          {/* {comments.map(comment => (
                            <div>
                              <Image
                                key={comment.author.id}
                                src={comment.author.image}
                                alt="Author Image"
                                width={24}
                                height={24}
                                className="-ml-2 rounded-full object-cover"
                              />
                            </div>
                          ))} */}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
            </div>

          </div>
        </div>
        {!isComment && group && (
          <Link
            href={`/groups/${group.id}`} className="mt-5 flex items-center"
          >
            <p className="text-subtle-medium text-gray-1">
              {/* {formatDateString(createdAt)} */}
              {group && `${group.name} Group`}
            </p>
            <Image
            src={group.image}
            alt={group.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
            />
          </Link>
        )}
      </article>
    </>
  )}


export default PostCard;