export const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/profile.svg",
      route: '/profile',
      label: "Profile",
    },
    {
      imgURL: "/assets/notifications.svg",
      route: "/notifications",
      label: "Notifications",
    },
    {
      imgURL: "/assets/tweet.svg",
      route: "/create-post",
      label: "Post",
    },
    {
      imgURL: "/assets/groups.svg",
      route: "/groups",
      label: "Groups",
    },
    // {
    //   imgURL: "/assets/search.svg",
    //   route: "/search",
    //   label: "Search",
    // },
  ];

  export const profileTabs = [
    { value: "tweets", label: "Tweets", icon: "/assets/gray-tweet.svg" },
    { value: "replies", label: "Replies", icon: "/assets/reply.svg" },
  ];

  export const groupTabs = [
    { value: "tweets", label: "Tweets", icon: "/assets/gray-tweet.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
  ];