'use client'

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, MoreVertical, Paperclip, Smile, Send, Plus, Check, Filter, Clock, Bookmark, X, Bot, AtSign, MessageSquare, ChevronRight, TrendingUp, MoreHorizontal, FileText, Menu } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"


type Chat = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  description: boolean
  approachingDeadline: boolean
  unreadCount: number
  lastActivity: Date
  assignedTo: string
  resolved: boolean
  resolvedAt?: Date
  tags: string[]
  bookmarked: boolean
  mentioned: boolean
  score?: {
    customerValue: number;
    sellingProbability: number;
  };
}

type Message = {
  id: string
  content: string
  sent: boolean
  timestamp: string
}

type FilterOption = 'all' | 'user' | 'mention' | 'marked' | 'resolved'

type Task = {
  id: string
  title: string
  subject: string
  assignedTo: string
  category: string
  description: string
  importance: string
}

type Stage = 'Marketing' | 'Presale' | 'After sale' | 'Retargeting'

type Service = 'Cloud' | 'CCTV' | 'Networking' | 'Technical Support' | 'Billing' | 'Product Information'

const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕']

const stages: Stage[] = ['Marketing', 'Presale', 'After sale', 'Retargeting']
const services: Service[] = ['Cloud', 'CCTV', 'Networking', 'Technical Support', 'Billing', 'Product Information']

export default function Conversations() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchHistory, setSearchHistory] = useState<Message[]>([])
  const [selectedAgent, setSelectedAgent] = useState("agent1")
  const [activeTab, setActiveTab] = useState<FilterOption>("all")
  const [contactNote, setContactNote] = useState("")
  const [newTag, setNewTag] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isChatbotDialogOpen, setIsChatbotDialogOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [filterOptions, setFilterOptions] = useState({
    unread: false,
    bookmarked: false,
    mentioned: false,
    approachingDeadline: false,
    hasDescription: false,
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)

  useEffect(() => {
    // Simulating API call to fetch chats
    const mockChats: Chat[] = [
      {
        id: "1",
        name: "Brooklyn Simmons",
        avatar: "/images/User1.png",
        lastMessage: "Hi, Good morning",
        time: "23h",
        description: true,
        approachingDeadline: true,
        unreadCount: 3,
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
        assignedTo: "agent1",
        resolved: false,
        tags: ["VIP", "Support"],
        bookmarked: false,
        mentioned: true
      },
      {
        id: "2",
        name: "Cameron Williamson",
        avatar: "/images/User2.png",
        lastMessage: "Hello there!",
        time: "1d",
        description: true,
        approachingDeadline: false,
        unreadCount: 0,
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago
        assignedTo: "agent2",
        resolved: true,
        resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        tags: ["Sales", "Follow-up"],
        bookmarked: true,
        mentioned: false
      },
      {
        id: "3",
        name: "Leslie Alexander",
        avatar: "/images/User3.png",
        lastMessage: "Can you help me with my order?",
        time: "2h",
        description: false,
        approachingDeadline: true,
        unreadCount: 1,
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        assignedTo: "agent1",
        resolved: false,
        tags: ["Support", "Urgent"],
        bookmarked: false,
        mentioned: false
      },
      {
        id: "4",
        name: "Marvin McKinney",
        avatar: "/images/User4.png",
        lastMessage: "Thank you for your assistance!",
        time: "1w",
        description: false,
        approachingDeadline: false,
        unreadCount: 0,
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
        assignedTo: "agent2",
        resolved: true,
        resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
        tags: ["Feedback", "Closed"],
        bookmarked: true,
        mentioned: true
      },
    ]
    
    // Calculate and add scores to each chat
    mockChats.forEach(chat => {
      chat.score = {
        customerValue: Math.floor(Math.random() * 10) + 1,
        sellingProbability: Math.floor(Math.random() * 10) + 1
      };
    });

    setChats(mockChats)
    const uniqueTags = Array.from(new Set(mockChats.flatMap(chat => chat.tags)))
    setAllTags(uniqueTags)
  }, [])

  useEffect(() => {
    if (selectedChat) {
      // Simulating API call to fetch messages for selected chat
      setMessages([
        { id: "1", content: "Hi", sent: false, timestamp: "09:00 AM" },
        { id: "2", content: "Hello! How can I help you today?", sent: true, timestamp: "09:01 AM" },
        { id: "3", content: "I have a question about my order", sent: false, timestamp: "09:02 AM" },
        { id: "4", content: "Sure, I'd be happy to help. Can you provide your order number?", sent: true, timestamp: "09:03 AM" },
        { id: "5", content: "Yes, it's #12345", sent: false, timestamp: "09:04 AM" },
      ])
    }
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleBookmark = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, bookmarked: !chat.bookmarked } : chat
    ))
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, newMsg])
      setNewMessage("")
      
      // Update last message in chat list
      setChats(prev => prev.map(chat => 
        chat.id === selectedChat ? { ...chat, lastMessage: newMessage, time: 'now', lastActivity: new Date() } : chat
      ))
    }
  }

  const handleSearch = () => {
    setIsSearching(true)
    // Simulating API call to search messages
    setTimeout(() => {
      setSearchHistory([
        { id: "1", content: "This is a search result", sent: false, timestamp: "Yesterday" },
        { id: "2", content: "Another search result", sent: true, timestamp: "2 days ago" },
      ])
      setIsSearching(false)
    }, 1000)
  }

  const handleAddTag = () => {
    if (newTag && selectedChat) {
      setChats(prev => prev.map(chat => 
        chat.id === selectedChat ? { ...chat, tags: [...chat.tags, newTag] } : chat
      ))
      setNewTag("")
      setAllTags(prev => Array.from(new Set([...prev, newTag])))
    }
  }

  const handleAttachment = (file: File) => {
    console.log("File attached:", file.name)
    // Here you would typically upload the file and add it to the messages
    const newMsg: Message = {
      id: Date.now().toString(),
      content: `File: ${file.name}`,
      sent: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMsg])
  }

  const handleAssignTask = (chatId: string, assignTo: string) => {
    const chat = chats.find(c => c.id === chatId)
    if (chat) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: (document.getElementById('task-name') as HTMLInputElement)?.value || `Task for ${chat.name}`,
        subject: chat.name,
        category: (document.querySelector('[name="task-category"]') as HTMLSelectElement)?.value || 'support',
        description: (document.getElementById('task-description') as HTMLTextAreaElement)?.value || '',
        importance: (document.querySelector('[name="task-importance"]') as HTMLSelectElement)?.value || 'medium',
        assignedTo: assignTo
      }
      setTasks(prev => [...prev, newTask])
      setChats(prev => prev.map(c => 
        c.id === chatId ? { ...c, assignedTo: assignTo } : c
      ))
      setIsTaskDialogOpen(false)
    }
  }

  const handleMarkAsResolved = (chatId: string, resolution: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, resolved: true, resolvedAt: new Date() } : chat
    ))
    console.log(`Chat ${chatId} marked as resolved with resolution: ${resolution}`)
  }

  const handleAssignChatbot = () => {
    if (selectedStage && selectedService) {
      console.log(`Assigned chatbot for stage: ${selectedStage} and service: ${selectedService}`)
      setIsChatbotDialogOpen(false)
      setSelectedStage(null)
      setSelectedService(null)
    }
  }

  const handleMentionAgent = (chatId: string, agent: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, mentioned: true } : chat
    ))
    // Here you would typically add a mention to the chat messages
    console.log(`Mentioned ${agent} in chat ${chatId}`)
  }

  const toggleTagFilter = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const filteredChats = chats.filter(chat => {
    if (searchTerm && !chat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    if (filterOptions.unread && chat.unreadCount === 0) return false
    if (filterOptions.bookmarked && !chat.bookmarked) return false
    if (filterOptions.mentioned && !chat.mentioned) return false
    if (filterOptions.approachingDeadline && !chat.approachingDeadline) return false
    if (filterOptions.hasDescription && !chat.description) return false

    if (selectedTags.length > 0 && !selectedTags.some(tag => chat.tags.includes(tag))) return false

    switch (activeTab) {
      case 'user':
        return chat.assignedTo === selectedAgent
      case 'mention':
        return chat.mentioned
      case 'marked':
        return chat.bookmarked
      case 'resolved':
        return chat.resolved
      default:
        return true
    }
  }).sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())

  return (
    <div className="h-screen flex bg-background text-foreground">
      {/* Left Sidebar */}
      <div className={`w-full md:w-80 border-r flex flex-col ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search Contacts" 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Chats</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterOptions.unread}
                  onCheckedChange={(checked) => 
                    setFilterOptions(prev => ({ ...prev, unread: checked }))
                  }
                >
                  Unread messages
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.bookmarked}
                  onCheckedChange={(checked) => 
                    setFilterOptions(prev => ({ ...prev, bookmarked: checked }))
                  }
                >
                  Bookmarked
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.mentioned}
                  onCheckedChange={(checked) => 
                    setFilterOptions(prev => ({ ...prev, mentioned: checked }))
                  }
                >
                  Mentioned
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.approachingDeadline}
                  onCheckedChange={(checked) => 
                    setFilterOptions(prev => ({ ...prev, approachingDeadline: checked }))
                  }
                >
                  Approaching Deadline
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.hasDescription}
                  onCheckedChange={(checked) => 
                    setFilterOptions(prev => ({ ...prev, hasDescription: checked }))
                  }
                >
                  Has Description
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
                {allTags.map(tag => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTagFilter(tag)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger>
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agent1">Agent1</SelectItem>
              <SelectItem value="agent2">Agent2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FilterOption)} className="p-2">
          <TabsList className="grid grid-cols-5 h-8">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="user" className="text-xs">@User</TabsTrigger>
            <TabsTrigger value="mention" className="text-xs">Mention</TabsTrigger>
            <TabsTrigger value="marked" className="text-xs">Marked</TabsTrigger>
            <TabsTrigger value="resolved" className="text-xs">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>
        <ScrollArea className="flex-1">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-muted ${
                selectedChat === chat.id ? "bg-muted" : ""
              } relative group`}
              onClick={() => {
                setSelectedChat(chat.id)
                setIsSidebarOpen(false)
              }}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{chat.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{chat.time}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hidden group-hover:flex items-center justify-center transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(chat.id);
                        }}
                      >
                        <Bookmark className={`h-4 w-4 ${chat.bookmarked ? "fill-primary text-primary" : ""}`} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onSelect={() => setIsTaskDialogOpen(true)}>
                            <AtSign className="mr-2 h-4 w-4" />
                            Assign as Task
                          </DropdownMenuItem>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="w-full">
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Mention Agent
                                <ChevronRight className="ml-auto h-4 w-4" />
                              </DropdownMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="w-36">
                              <DropdownMenuItem onClick={() => handleMentionAgent(chat.id, 'agent1')}>
                                Agent 1
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMentionAgent(chat.id, 'agent2')}>
                                Agent 2
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="w-full">
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                Resolve
                                <ChevronRight className="ml-auto h-4 w-4" />
                              </DropdownMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="w-36">
                              <DropdownMenuItem onClick={() => handleMarkAsResolved(chat.id, 'Solved Problem')}>
                                Solved Problem
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkAsResolved(chat.id, 'Spam')}>
                                Spam
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkAsResolved(chat.id, 'Low Potential')}>
                                Low Potential
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkAsResolved(chat.id, 'Mismatch')}>
                                Mismatch
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</div>
                  <div className="flex items-center gap-2 mt-2">
                    {chat.bookmarked && (
                      <Badge variant="secondary" className="rounded-full text-xs">
                        Bookmarked
                      </Badge>
                    )}
                    <div className="hidden group-hover:flex items-center gap-2">
                      {chat.resolved && (
                        <Badge variant="outline" className="rounded-full">
                          Resolved
                        </Badge>
                      )}
                      {chat.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
          {selectedChat ? (
            <>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search history of this contact" 
                  className="pl-8" 
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Dialog open={isChatbotDialogOpen} onOpenChange={setIsChatbotDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChatbotDialogOpen(true)}
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      Assign Chatbot
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Chatbot</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="stage">Stage</Label>
                        <Select value={selectedStage || ''} onValueChange={(value) => setSelectedStage(value as Stage)}>
                          <SelectTrigger id="stage">
                            <SelectValue placeholder="Select Stage" />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="service">Service</Label>
                        <Select value={selectedService || ''} onValueChange={(value) => setSelectedService(value as Service)}>
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Select Service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAssignChatbot} disabled={!selectedStage || !selectedService}>
                        Assign Chatbot
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 text-center text-muted-foreground">
              Select a chat to start messaging
            </div>
          )}
        </div>
        {selectedChat ? (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {isSearching ? (
                  <div className="text-center">Searching...</div>
                ) : searchHistory.length > 0 ? (
                  searchHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid grid-cols-8 gap-2">
                      {emojis.map(emoji => (
                        <button
                          key={emoji}
                          className="text-lg hover:bg-muted p-1 rounded"
                          onClick={() => setNewMessage(prev => prev + emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Choose Template</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setNewMessage("Hello, how can I assist you today?")}>
                      Greeting
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setNewMessage("Thank you for contacting us. Your issue has been resolved.")}>
                      Issue Resolved
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setNewMessage("I'm sorry, but I'll need to transfer you to a specialist for further assistance.")}>
                      Transfer to Specialist
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Attach a file</DialogTitle>
                    </DialogHeader>
                    <Input 
                      type="file" 
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleAttachment(file)
                        }
                      }} 
                    />
                  </DialogContent>
                </Dialog>
                <Input 
                  placeholder="Type a message" 
                  className="flex-1" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className={`w-full md:w-80 border-l flex flex-col ${isRightSidebarOpen ? 'block' : 'hidden'} md:block`}>
        {selectedChat && (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chats.find(c => c.id === selectedChat)?.avatar} alt="Contact" />
                    <AvatarFallback>{chats.find(c => c.id === selectedChat)?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{chats.find(c => c.id === selectedChat)?.name}</div>
                    <div className="text-sm text-muted-foreground">+912122121</div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-destructive">
                      Block User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="p-4 border-b">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Score</h3>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  {(() => {
                    const score = chats.find(chat => chat.id === selectedChat)?.score?.customerValue || 0;
                    let bgColor = "bg-gray-500";
                    if (score > 7) {
                      bgColor = "bg-green-500";
                    } else if (score > 4) {
                      bgColor = "bg-orange-500";
                    }
                    return (
                      <div className={`${bgColor} text-white text-4xl font-bold w-16 h-16 rounded-xl flex items-center justify-center`}>
                        {score}
                      </div>
                    );
                  })()}
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-green-500 rounded-full w-3/4" />
                    <div className="h-2 bg-orange-400 rounded-full w-1/2" />
                    <div className="h-2 bg-gray-300 rounded-full w-1/4" />
                  </div>
                  <div className="text-green-500">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div>
                  <Label htmlFor="email" className="text-sm text-muted-foreground">Email id</Label>
                  <Input id="email" value="info@xyz.com" readOnly className="mt-1" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm text-muted-foreground">Add Fields</Label>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground mb-2">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {chats.find(chat => chat.id === selectedChat)?.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="flex gap-1">
                        <Check className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        placeholder="New tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="w-24 h-6 text-xs"
                      />
                      <Button size="sm" variant="outline" className="h-6" onClick={handleAddTag}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="note" className="text-sm text-muted-foreground mb-2">Note</Label>
                  <Textarea
                    id="note"
                    placeholder="Add a note about this contact"
                    value={contactNote}
                    onChange={(e) => setContactNote(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">Last updated: 08/07/2024</span>
                    <Button size="sm" onClick={() => setContactNote("")}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>
              
            </ScrollArea>
          </>
        )}
      </div>

      {/* Task Assignment Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
            <DialogDescription>Create a new task for this conversation.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-name" className="text-right">
                Task Name
              </Label>
              <Input id="task-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-category" className="text-right">
                Category
              </Label>
              <Select name="task-category">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-description" className="text-right">
                Description
              </Label>
              <Textarea id="task-description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-importance" className="text-right">
                Importance
              </Label>
              <Select name="task-importance">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleAssignTask(selectedChat!, selectedAgent)}>Assign Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}