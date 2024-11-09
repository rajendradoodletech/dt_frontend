
"use client"

import { useState } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import MultiSelectGroups from "@/components/multyslectgroups"

export default function Component() {
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false)
  const [showGroupForm, setShowGroupForm] = useState(false)
  const [groups, setGroups] = useState([
    { id: 1, name: "All Customers" },
    { id: 2, name: "VIP Customers" },
    { id: 3, name: "New Customers" },
  ])
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <PhoneIcon className="w-6 h-6" />
            <span className="text-lg font-bold">WhatsApp Campaigns</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="hover:underline" prefetch={false}>
              Campaigns
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Analytics
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Settings
            </Link>
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <MenuIcon className="w-5 h-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="#" prefetch={false}>
                Campaigns
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#" prefetch={false}>
                Analytics
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#" prefetch={false}>
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1 py-8 px-4 md:px-8 flex">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Ongoing Campaigns</h1>
            <Button
              onClick={() => setShowNewCampaignForm(true)}
              className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-4 py-4 my-8 rounded-md hover:bg-primary/90"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Campaign</span>
            </Button>
          </div>
          {showNewCampaignForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Campaign Name</Label>
                      <Input id="name" placeholder="Enter campaign name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="template">Template</Label>
                      <Select>
                        <SelectTrigger id="template">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="template1">Template 1</SelectItem>
                          <SelectItem value="template2">Template 2</SelectItem>
                          <SelectItem value="template3">Template 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                   {/*  <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="groups">Assigned Groups</Label>
                      <Select >
                        <SelectTrigger id="groups">
                          <SelectValue placeholder="Select groups" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="all">All Customers</SelectItem>
                          <SelectItem value="vip">VIP Customers</SelectItem>
                          <SelectItem value="new">New Customers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
<MultiSelectGroups />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowNewCampaignForm(false)}>
                  Cancel
                </Button>
                <Button>Create Campaign</Button>
              </CardFooter>
            </Card>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Black Friday Sale</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">Ongoing</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Campaign ID</p>
                    <Badge variant="outline">BF2023</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Template Name</p>
                    <Badge variant="outline">Black Friday Template</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <Badge variant="outline">$500</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Groups</p>
                    <Badge variant="outline">All Customers</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                  prefetch={false}
                >
                  <EyeIcon className="w-6 h-6" />
                  <span>View Details</span>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Holiday Promotion</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">Ongoing</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Campaign ID</p>
                    <Badge variant="outline">HP2023</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Template Name</p>
                    <Badge variant="outline">Holiday Template</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <Badge variant="outline">$800</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Groups</p>
                    <Badge variant="outline">VIP Customers</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                  prefetch={false}
                >
                  <EyeIcon className="w-5 h-5" />
                  <span>View Details</span>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Year's Sale</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">Ongoing</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Campaign ID</p>
                    <Badge variant="outline">NYS2024</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Template Name</p>
                    <Badge variant="outline">New Year Template</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <Badge variant="outline">$600</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Groups</p>
                    <Badge variant="outline">All Customers</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                  prefetch={false}
                >
                  <EyeIcon className="w-5 h-5" />
                  <span>View Details</span>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="w-64 bg-white p-4 rounded-lg mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Groups</h2>
            <p className="text-sm text-muted-foreground">Manage your contact groups.</p>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between">
              <span>Filter 1</span>
              <Badge variant="outline">123</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Filter 2</span>
              <Badge variant="outline">456</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Filter 3</span>
              <Badge variant="outline">789</Badge>
            </div>
          </div>
          <div className="space-y-2">
            {groups.map((group) => (
              <div key={group.id} className="flex items-center justify-between">
                <span>{group.name}</span>
                <Badge variant="outline">{group.id}</Badge>
              </div>
            ))}
          </div>
          <Button onClick={() => setShowGroupForm(true)} className="w-full mt-4">
            Add Contacts
          </Button>
          {showGroupForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Label htmlFor="group-name" className="mb-2">
                      Group Name
                    </Label>
                    <Input id="group-name" placeholder="Enter group name" />
                  </div>
                  <div>
                    <Label htmlFor="contacts" className="mb-2">
                      Contacts
                    </Label>
                    <Textarea id="contacts" placeholder="Paste contacts or upload CSV file" rows={4} />
                  </div>
                  <Button variant="outline">
                    <UploadIcon className="w-5 h-5 mr-2" />
                    Upload CSV
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => setShowGroupForm(false)} variant="outline" className="mr-2">
                  Cancel
                </Button>
                <Button>Create Group</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
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


function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}