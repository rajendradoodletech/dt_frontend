// components/DashboardHeader.tsx
import Image from 'next/image'
import { cn } from "@/lib/utils"
import Link from "next/link"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card } from './card'
 

interface DashboardHeaderProps {
  title: string
  buttonText: string
  backgroundImage: string
}

export default function DashboardHeader({
  title,
  buttonText,
  backgroundImage,
}: DashboardHeaderProps) {
  return (
    <header className="relative m-0 w-full bg h-[68px] bg-cover bg-green-500">
      
      <Image
        src={backgroundImage} // Dynamically load the image
        className="absolute w-full h-[68px] object-cover" 
        alt="Header Background"
        height={68}
        width={1920}
      />
      
        
        <h1 className={cn("text-white absolute top-1/2 transform -translate-y-1/2 left-24 text-lg md:text-lg lg:text-lg font-regular")}>
          {title} {/* Dynamically set the title */}
        </h1>
       
      
    </header>
  )
}
