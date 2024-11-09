

import DashSidebar from "@/components/dashSidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <div className="container relative gap-4 mx-auto flex ">
                   <DashSidebar></DashSidebar>    {children} </div>
  );
}
