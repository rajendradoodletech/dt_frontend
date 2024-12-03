'use client'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Settings as SettingsIcon, Eye as ViewIcon, MessageSquare as MessageSquareIcon, Calendar as CalendarIcon } from 'lucide-react';
import logo from "../icons/logo.svg"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useRouter } from "next/navigation";

export default function DashSidebar() {
  const router = useRouter()
  const logoutClicked = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    router.push("/login")
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed inset-y-0 left-0 z-20 flex h-full w-16 flex-col items-center justify-between bg-background  border-r">
        <div className="flex items-center justify-center py-4">
          <Link href="overview" className="flex items-center justify-center" prefetch={false}>
            <Logo className="h-6 w-6" />
            <span className="sr-only">Buzzup</span>
          </Link>
        </div>
        <nav className="flex flex-col items-center gap-4 py-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="http://localhost:3000/dashboard/overview"
                className="group flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                prefetch={false}
              >
                <ViewIcon className="h-5 w-5" />
                <span className="sr-only">Overview</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Overview</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="http://localhost:3000/dashboard/messages"
                className="group flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                prefetch={false}
              >
                <MessageSquareIcon className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Messages</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="http://localhost:3000/dashboard/campaigns"
                className="group flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                prefetch={false}
              >
                <CalendarIcon className="h-5 w-5" />
                <span className="sr-only">Campaigns</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Campaigns</TooltipContent>
          </Tooltip>
        </nav>
        <div className="flex flex-col items-center gap-4 pb-6">
          <DropdownMenu>
         
              
              <ModeToggle/>
           

            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="group">
                <SettingsIcon className="h-5 w-5 transition-colors group-hover:text-foreground" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Integrations</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick = {logoutClicked}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  )
}



function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    
<svg {...props} width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H8.5C15.4036 0 21 5.59644 21 12.5C21 19.4036 15.4036 25 8.5 25H0V0Z" fill="#1E1E1E"/>
</svg>
  )
}

