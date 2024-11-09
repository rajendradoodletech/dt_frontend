export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "DesertForest",
  description:
    "A system to ease sale from scratch",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Login",
      href: "/login",
    },
    {
      title: "Sign Up",
      href: "/",
    },
    {
      title: "Chat",
      href: "/chatwid",
    },
    {
      title: "AgentChat",
      href: "dashboard/chat2",
    },
    {
      title: "Overview",
      href: "/dashboard/overview",
    },
  ],
}
