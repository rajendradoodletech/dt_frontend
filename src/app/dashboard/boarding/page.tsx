"use client"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Eye } from "lucide-react"
import { cn } from "@/lib/utils"



const Boarding: FC = () => {
  return (
    <div className="flex container flex-col h-screen w-full mx-auto md:flex-row " >
    <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:px-6 sm:py-0">
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-none">
      
      <div className="w-full max-w-6xl  px-4 sm:px-6 py-6 sm:py-8 md:py-12 space-y-8 sm:space-y-12">
      {/* Welcome Section */}
      <section className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg text-muted-foreground">
          Hi, Welcome on board,
        </p>
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-medium text-[#4F5DA3] max-w-2xl tracking-tight leading-tight">
          Get your audiences back on track with real-time whatsapp responses
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <Button 
            size="lg"
            className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white rounded-full"
          >
            I have a business account
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full"
          >
            Register Now
          </Button>
        </div>
      </section>

      {/* Growing Fast Section */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground">
          We are growing fast
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {/* Summer Holidays Card */}
            <CarouselItem className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <Card className="border-0 bg-[#F7FAF7]">
                <CardHeader className="p-0">
                  <div className="h-32 sm:h-40 bg-[#DFFCE4] rounded-lg transition-transform hover:scale-[1.02] m-3 sm:m-4" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="font-medium text-sm sm:text-base">Summer holidays</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>100+ views</span>
                    <Badge variant="secondary" className="bg-[#DFFCE4] text-[#22C55E] hover:bg-[#DFFCE4]/80">
                      5 New
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            {/* Coming Soon Cards */}
            {[1, 2, 3].map((index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="h-32 sm:h-40 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                    <CardFooter className="justify-center p-0 pt-3 sm:pt-4">
                      <h3 className="text-[#22C55E] font-medium text-sm sm:text-base">
                        Coming Soon
                      </h3>
                    </CardFooter>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="-left-12 sm:-left-5" />
            <CarouselNext className="-right-12 sm:-right-5" />
          </div>
        </Carousel>
      </section>
    </div>
      <CardContent>
       {/* <BusinessAnalytics></BusinessAnalytics> */}
      </CardContent>
    </Card>
    
    </main>
    </div>
    
  )
}

export default Boarding
