import { FC } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import CarouselContactItem  from "@/components/messagecomponents/carousalItem"
import ContactItem from "@/components/messagecomponents/contactItem"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Bookmark as BookmarkIcon,
  FileEdit as FilePenIcon,
  Filter as FilterIcon,
  Locate as LocateIcon,
  Mail as MailIcon,
  MoveHorizontal as MoveHorizontalIcon,
  Paperclip as PaperclipIcon,
  Phone as PhoneIcon,
  Plus as PlusIcon,
  Send as SendIcon,
  Smile as SmileIcon,
  StickyNote as StickyNoteIcon,
  Tags as TagsIcon,
  X as XIcon
} from 'lucide-react';
import Conversations from "@/components/messagecomponents/conversations"



// Define prop types for CarouselContactItem component
interface CarouselContactItemProps {
  name: string;
  src: string;
  fallback: string;
}




const Messages: FC = () => {
  return (
    
    <div className="flex container flex-col h-screen w-full mx-auto md:flex-row gap-2 ">
    <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:px-6 sm:py-0">
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-none"><Conversations/></Card>
    
    
    
    </main>
    </div>
       
    
  )
}

export default Messages
