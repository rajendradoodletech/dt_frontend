import Link from "next/link"
import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/ui/main-nav"
import { ModeToggle } from "./mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}
