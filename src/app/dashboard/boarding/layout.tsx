

import DashSidebar from "@/components/dashSidebar";
import bgmessages from '/public/images/bgmessages.png'
import DashboardHeader from "@/components/ui/dashboardHeader"
import DashboardTopHeader from "@/components/ui/dashboardtopHeader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <div className="w-full relative flex flex-col ">
                  {  <DashSidebar></DashSidebar> }
                  <DashboardTopHeader></DashboardTopHeader>     {children} </div>
  );
}
