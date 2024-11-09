import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { Button } from '../ui/button'
import { BookmarkIcon } from 'lucide-react'


// Define prop types for ContactItem component
interface ContactItemProps {
    name: string;
    src: string;
    fallback: string;
    time: string;
    message: any;
  }
  

const ContactItem: FC<ContactItemProps> = ({ name, src, fallback, time, message }) => {
    return (
      <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted-foreground/10" prefetch={false}>
        <Avatar className="w-12 h-12 rounded-md">
          <AvatarImage src={src} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1 truncate">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground truncate">{message}</div>
        </div>
        <div className="text-xs text-muted-foreground">{time}</div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <BookmarkIcon className="w-5 h-5" />
        </Button>
      </Link>
    )
  }
  
  export default ContactItem
  