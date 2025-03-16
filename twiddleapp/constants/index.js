import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

export const sidebarLinks = [
    // {
    //   imgURL: "/assets/home-white.svg",
    //   route: "/",
    //   label: "Home"
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
    //   imgURL: "/assets/headphone.svg",
    //   route: "/podcasts",
    //   label: "Podcasts",
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
  export const podcastData = [
    {
      id: 1,
      title: "The Dog Pod",
      description: "A long form, in-depth conversation",
      imgURL:
        "/assets/brenda.svg",
    },
    // {
    //   id: 1,
    //   title: "The Joe Rogan Experience",
    //   description: "A long form, in-depth conversation",
    //   imgURL:
    //     "https://lovely-flamingo-139.convex.cloud/api/storage/3106b884-548d-4ba0-a179-785901f69806",
    // },
    {
      id: 2,
      title: "The Futur",
      description: "This is how the news should sound",
      imgURL:
        "/assets/brenda.svg",
    },
    {
      id: 3,
      title: "Waveform",
      description: "Diddle diddle dee wubba wubba wubba",
      imgURL:
        "/assets/brenda.svg",
    },
    {
      id: 4,
      title: "The Tech Talks Daily Podcast",
      description: "This is how the news should sound",
      imgURL:
        "/assets/brenda.svg",
    },
    {
      id: 5,
      title: "GaryVee Audio Experience",
      description: "A long form, in-depth conversation",
      imgURL:
        "/assets/brenda.svg",
    },
    {
      id: 6,
      title: "Syntax ",
      description: "Diddle diddle dee wubba wubba wubba",
      imgURL:
        "/assets/brenda.svg",
    },
    {
      id: 7,
      title: "IMPAULSIVE",
      description: "A long form, in-depth conversation",
      imgURL:
        "/assets/brenda.svg",
    },
    {
      id: 8,
      title: "Ted Tech",
      description: "This is how the news should sound",
      imgURL:
        "/assets/brenda.svg",
    },
  ];