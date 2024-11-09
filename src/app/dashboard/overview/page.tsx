import { FC } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"




// Define prop types for CarouselContactItem component
interface CarouselContactItemProps {
  name: string;
  src: string;
  fallback: string;
  time: Date;
}




const Overview: FC = () => {
  return (
    <div className="flex container flex-col h-screen w-full mx-auto md:flex-row " >
    <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:px-6 sm:py-0">
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-none">
      <CardHeader >
        <CardTitle>Hi, John</CardTitle>
        <CardDescription>Key metrics and insights for your messages.</CardDescription>
      </CardHeader>
      {/* <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-2xl font-bold">12,345</div>
            <div className="text-sm text-muted-foreground">Messages Sent</div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-2xl font-bold">8,765</div>
            <div className="text-sm text-muted-foreground">Messages Received</div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="text-sm text-muted-foreground">Customer Feedback</div>
          </div>
        </div>
      </CardContent> */}
      <CardContent>
       Overview
      </CardContent>
    </Card>
    
    </main>
    </div>
    
  )
}

export default Overview
