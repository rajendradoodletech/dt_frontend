import { FC } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel"



// Define prop types for CarouselContactItem component
interface CarouselContactItemProps {
  name: string;
  src: string;
  fallback: string;
}

const CarouselContactItem: FC<CarouselContactItemProps> = ({ name, src, fallback }) => {
  return (
    <CarouselItem className="basis-1/5">
      <Link href="#" className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10" prefetch={false}>
        <Avatar className="w-8 h-8 rounded-full">
          <AvatarImage src={src} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="text-xs">{name}</div>
      </Link>
    </CarouselItem>
  )
}
export default CarouselContactItem