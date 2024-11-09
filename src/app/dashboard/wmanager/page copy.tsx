
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="flex flex-col h-screen w-full  mx-auto md:flex-row">
      <div className="bg-muted border-r w-full md:w-[300px] md:block">
        <div className="border-b p-4 flex items-center">
          <Input placeholder="Search contacts" className="w-full bg-muted-foreground/10 border-none focus:ring-0" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2 rounded-full">
                <FilterIcon className="w-4 h-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <span>Filter by name</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Filter by status</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Filter by location</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="divide-y">
          <div className="p-4">
            <div className="font-medium mb-2">Bookmarks</div>
            <Carousel >
              <CarouselContent className="flex flex-row gap-1">
                <CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">John</div>
                  </Link>
                  
                </CarouselItem >
                <CarouselItem className="basis-1/5" >
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Jane</div>
                  </Link>
                </CarouselItem>
                <CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Alex</div>
                  </Link>
                </CarouselItem>
                <CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">John</div>
                  </Link>
                  
                </CarouselItem >
                <CarouselItem className="basis-1/5" >
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Jane</div>
                  </Link>
                </CarouselItem>
                <CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Alex</div>
                  </Link>
                </CarouselItem>
                <CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">John</div>
                  </Link>
                  
                </CarouselItem >
                <CarouselItem className="basis-1/5" >
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Jane</div>
                  </Link>
                </CarouselItem>
                <CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Alex</div>
                  </Link>
                </CarouselItem><CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">John</div>
                  </Link>
                  
                </CarouselItem >
                <CarouselItem className="basis-1/5" >
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Jane</div>
                  </Link>
                </CarouselItem>
                <CarouselItem className="basis-1/5">
                  <Link
                    href="#"
                    className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-muted-foreground/10"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">Alex</div>
                  </Link>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="ml-5" />
              <CarouselNext className="mr-5" />
            </Carousel>
          </div>
          <Link
            href="#"
            className="flex items-center gap-4 p-4 hover:bg-muted-foreground/10 bg-primary/10"
            prefetch={false}
          >
            <Avatar className="w-12 h-12 rounded-md">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground truncate">Hey, how's it going?</div>
            </div>
            <div className="text-xs text-muted-foreground">2:34 PM</div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BookmarkIcon className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted-foreground/10" prefetch={false}>
            <Avatar className="w-12 h-12 rounded-md">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-muted-foreground truncate">Can we meet up later?</div>
            </div>
            <div className="text-xs text-muted-foreground">12:45 PM</div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BookmarkIcon className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted-foreground/10" prefetch={false}>
            <Avatar className="w-12 h-12 rounded-md">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <div className="font-medium">Alex Johnson</div>
              <div className="text-sm text-muted-foreground truncate">Did you see the latest update?</div>
            </div>
            <div className="text-xs text-muted-foreground">9:21 AM</div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BookmarkIcon className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-muted border-b p-4 flex items-center gap-4">
          <Avatar className="w-12 h-12 rounded-md">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-muted-foreground">Online</div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoveHorizontalIcon className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 rounded-md">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg p-3 max-w-[70%] md:max-w-[50%]">
              <p>Hey, how's it going?</p>
              <div className="text-xs text-muted-foreground mt-1">2:34 PM</div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="bg-primary rounded-lg p-3 max-w-[70%] md:max-w-[50%] text-primary-foreground">
              <p>I'm doing great, thanks for asking!</p>
              <div className="text-xs text-primary-foreground/80 mt-1">2:35 PM</div>
            </div>
            <Avatar className="w-10 h-10 rounded-md">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 rounded-md">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg p-3 max-w-[70%] md:max-w-[50%]">
              <p>Did you see the latest update?</p>
              <div className="text-xs text-muted-foreground mt-1">2:36 PM</div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="bg-primary rounded-lg p-3 max-w-[70%] md:max-w-[50%] text-primary-foreground">
              <p>Yeah, I just checked it out. Looks great!</p>
              <div className="text-xs text-primary-foreground/80 mt-1">2:37 PM</div>
            </div>
            <Avatar className="w-10 h-10 rounded-md">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="bg-muted border-t p-4 flex items-center gap-4">
          <Input
            placeholder="Type your message..."
            className="flex-1 bg-muted-foreground/10 border-none focus:ring-0"
          />
          <Button variant="ghost" size="icon" className="rounded-full">
            <PaperclipIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <SmileIcon className="w-5 h-5" />
          </Button>
          <Button size="icon" className="rounded-full">
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="bg-muted border-l w-full md:w-[300px] md:block">
        <div className="border-b p-4">
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-muted-foreground">Online</div>
        </div>
        <div className="divide-y">
          <div className="flex flex-col items-center gap-4 p-4">
            <Avatar className="w-24 h-24 rounded-full">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground truncate">Software Engineer</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <TagsIcon className="w-6 h-6" />
            <div className="flex-1 truncate">
              <div className="font-medium">Tags</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add Tag</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <StickyNoteIcon className="w-6 h-6" />
            <div className="flex-1 truncate">
              <div className="font-medium">Notes</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Meeting notes from 05/12/2023</div>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <FilePenIcon className="w-4 h-4" />
                    <span className="sr-only">Edit Note</span>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Project roadmap discussion</div>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <FilePenIcon className="w-4 h-4" />
                    <span className="sr-only">Edit Note</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add Note</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <LocateIcon className="w-6 h-6" />
            <div className="flex-1 truncate">
              <div className="font-medium">Location</div>
              <div className="text-sm text-muted-foreground truncate">San Francisco, CA</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <PhoneIcon className="w-6 h-6" />
            <div className="flex-1 truncate">
              <div className="font-medium">Phone</div>
              <div className="text-sm text-muted-foreground truncate">(123) 456-7890</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <MailIcon className="w-6 h-6" />
            <div className="flex-1 truncate">
              <div className="font-medium">Email</div>
              <div className="text-sm text-muted-foreground truncate">john.doe@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}


function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function LocateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}


function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MoveHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PaperclipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}


function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}


function StickyNoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
      <path d="M15 3v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function TagsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
      <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
    </svg>
  )
}


function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}