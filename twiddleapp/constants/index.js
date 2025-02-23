import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

export const sidebarLinks = [
    // {
    //   imgURL: "/assets/home-white.svg",
    //   route: "/",
    //   label: "Home",
    //   icon: BsHouseFill
    // },
    // {
    //   imgURL: "/assets/profile-white.svg",
    //   route: '/profile',
    //   label: "Profile",
    // },
    // {
    //   imgURL: "/assets/notifications-white.svg",
    //   route: "/alerts",
    //   label: "Alerts",
    // },
    // {
    //   imgURL: "/assets/groups-white.svg",
    //   route: "/groups",
    //   label: "Groups",
    // },
    // {
    //   imgURL: "/assets/post.svg",
    //   route: "/create-post",
    //   label: "Post",
    // },
    // {
    //   imgURL: "/assets/search-white.svg",
    //   route: "/search",
    //   label: "Search",
    // },
  ];
  const replyIcon = <AiOutlineMessage size={24} color="#555" />;
  const groupIcon = <BsPeople size={24} color="#555" />;
  export const profileTabs = [
    { value: "posts", label: "Posts", icon: "/assets/gray-tweet.svg" },
    { value: "replies", label: "Replies", icon:"/assets/reply.svg"},
  ];

  export const groupTabs = [
    { value: "posts", label: "Posts", icon: "/assets/gray-tweet.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
  ];