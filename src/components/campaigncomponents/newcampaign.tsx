'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Check, ChevronDown, ChevronUp, Cloud, Download, Info, Link2, MessageCircle, MoreHorizontal, MoreVertical, Phone, Smile, Mic, Paperclip, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { create } from 'zustand'
import axios from 'axios'

const backendAPI = "http://localhost:8000"

type Step = 1 | 2 | 3;

interface Contact {
  id: string;
  name: string;
}

interface ContactGroup {
  id: string;
  name: string;
  contacts: Contact[];
}

const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  platform: z.enum(["whatsapp", "sms", "email"]),
  mediaTemplate: z.boolean(),
  selectedTemplate: z.string(),
  contactGroups: z.array(z.object({
    id: z.string(),
    name: z.string(),
    contacts: z.array(z.object({
      id: z.string(),
      name: z.string(),
    })),
  })),
  messageContent: z.string().min(1, "Message content is required"),
  variable1: z.string(),
  variable2: z.string(),
  sendType: z.enum(["now", "schedule"]),
  scheduleDate: z.string().optional(),
  scheduleTime: z.string().optional(),
})

type CampaignData = z.infer<typeof campaignSchema>

interface CampaignStore {
  campaignData: CampaignData
  updateCampaignData: (data: Partial<CampaignData>) => void
  submitCampaign: () => Promise<void>
}

const useCampaignStore = create<CampaignStore>((set) => ({
  campaignData: {
    name: '',
    platform: 'whatsapp',
    mediaTemplate: false,
    selectedTemplate: 'hello_world',
    contactGroups: [],
    messageContent: "New offers are available for {{1}} 🎉",
    variable1: 'Name',
    variable2: 'Festival Name',
    sendType: 'now',
  },
  updateCampaignData: (data) => set((state) => ({ campaignData: { ...state.campaignData, ...data } })),
  submitCampaign: async () => {
    const { campaignData } = useCampaignStore.getState()
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Campaign submitted:', campaignData)
      // In a real scenario, you would use axios here:
      // await axios.post('/api/campaigns', campaignData)
    } catch (error) {
      console.error('Error submitting campaign:', error)
      throw error
    }
  },
}))

export default function CampaignCreator() {
  const [step, setStep] = useState<Step>(1)
  const [newGroupName, setNewGroupName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { campaignData, updateCampaignData, submitCampaign } = useCampaignStore()
  const [selectedTemplate, setSelectedTemplate]= useState({})
  const [selectedCSV, setSelectedCSV] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<CampaignData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaignData,
  })

  useEffect(()=>{
    const config = {
      headers: {
        authorization: localStorage.getItem("access_token")
      }
    }
    axios.get("http://localhost:8000/templates", config)
    .then(res => {
      setTemplates(res.data)
      setSelectedTemplate(res.data[0])
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(()=>{
    console.log(selectedTemplate)
  }, [selectedTemplate])

  useEffect(()=>{
    console.log(selectedCSV)
  }, [selectedCSV])

  const [templates, setTemplates] = useState([])

  const handleNext = useCallback(() => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step)
    }
  }, [step])

  const submitForm = () => {
    console.log(campaignData)
    handleSubmit(async (data) => {
      console.log("Data", data)
    })
  }


  const handlePrevious = useCallback(() => {
    if (step > 1) setStep((prev) => (prev - 1) as Step)
  }, [step])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (file) {
      // File selected, open dialog
      setNewGroupName('')
      setSelectedCSV(event?.target?.files[0])
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const file = event.dataTransfer.files[0]
    if (file) {
      // File dropped, open dialog
      setNewGroupName('')
      setSelectedCSV(event?.dataTransfer?.files[0])
    }
  }, [])

  const handleSaveGroup = useCallback(() => {
    if (newGroupName.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a group name.",
        variant: "destructive",
      })
      return
    }

    // Simulating file processing
    const newContacts: Contact[] = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Alice Johnson' },
    ]

    const newGroup: ContactGroup = {
      id: Date.now().toString(),
      name: newGroupName,
      contacts: newContacts,
    }

    updateCampaignData({ contactGroups: [...campaignData.contactGroups, newGroup] })
    setNewGroupName('')

    toast({
      title: "Group added",
      description: `${newGroup.name} with ${newContacts.length} contacts has been added to your campaign.`,
    })
  }, [newGroupName, campaignData.contactGroups, updateCampaignData, toast])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    if(step === 3){
      const formData = new FormData()
      formData.append("file", selectedCSV)
      formData.append("campaign_name", data.name)
      formData.append("template", selectedTemplate.id)
      formData.append("template_name", selectedTemplate.name)
      axios.post(`${backendAPI}/create-campaign/`, formData)
      .then(res => {
        setShowSuccess(true)
      })
    }
  })

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
      {showSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Success! </strong>
        <span className="block sm:inline">Campaign created successfully</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick = {()=>setShowSuccess(false)}>
          <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>}
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-700">New Campaign</h1>
      
      {/* Steps */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={cn(
              "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center",
              step > s ? "bg-primary text-primary-foreground" : (step === s ? "bg-primary text-primary-foreground" : "bg-muted border-2 border-muted-foreground text-muted-foreground")
            )}>
              {step > s ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <span className="text-xs sm:text-sm">{s}</span>}
            </div>
            <span className={cn(
              "ml-1 sm:ml-2 text-xs sm:text-sm",
              step >= s ? "font-medium text-foreground" : "text-muted-foreground"
            )}>
              {s === 1 ? "Campaign" : s === 2 ? "Contacts" : "Message"}
            </span>
            {s < 3 && <div className="flex-1 h-px bg-border mx-2 sm:mx-4" />}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                {step === 1 && (
                  <>
                    {/* Campaign Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="campaign-name">Campaign Name</Label>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <Input 
                              id="campaign-name" 
                              {...field}
                              className={errors.name ? "border-red-500" : ""}
                            />
                          )}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Controller
                          name="platform"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value} disabled>
                              <SelectTrigger id="platform">
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="whatsapp">Whatsapp</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>

                    {/* Media Template Toggle */}
                    {/* <div className="p-4 bg-secondary rounded-lg mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="media-template" className="font-medium">Activate Media Template</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Dynamic Templates have buttons, list messages, images, videos and docs
                          </p>
                        </div>
                        <Controller
                          name="mediaTemplate"
                          control={control}
                          render={({ field }) => (
                            <Switch
                              id="media-template"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </div> */}

                    {/* Template Selection with Scroller */}
                    <div className="space-y-4">
                      <Label>Choose Template</Label>
                      <div className="overflow-x-auto pb-4 -mx-4 px-4">
                        <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
                          {templates.map((template) => (
                            <Button
                              key={template.name}
                              onClick={() => {
                                updateCampaignData({ selectedTemplate: template.name })
                                setSelectedTemplate(template)
                              }}
                              variant={campaignData.selectedTemplate === template.name ? "secondary" : "outline"}
                              className="whitespace-nowrap transition-colors hover:bg-secondary/80"
                            >
                              {template.name}
                              {campaignData.selectedTemplate === template.name && (
                                <Check className="w-4 h-4 ml-2" />
                              )}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    {/* Add Contacts Section */}
                    <div className="space-y-4 mb-6">
                      <p className="text-sm text-muted-foreground">Add Contacts with given doc</p>
                      
                      <Button variant="outline" className="w-full justify-between">
                        <div className="flex items-center truncate mr-2">
                          <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate text-xs sm:text-sm">Download Dynamic Template + Contact doc (XL)</span>
                        </div>
                        <Download className="w-4 h-4 flex-shrink-0" />
                      </Button>

                      <div 
                        className="border-2 border-dashed border-border rounded-lg p-4 sm:p-8 text-center space-y-4 transition-colors hover:bg-secondary/10 hover:border-primary/50"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                            <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground">or Drag and Drop contacts to create another group</p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">CSV, XLS, VCF</p>
                          </div>
                          <Input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileUpload}
                            accept=".csv,.xls,.xlsx,.vcf"
                            ref={fileInputRef}
                          />
                        </Label>
                      </div>
                    </div>

                    {/* Choose From Saved Contacts */}
                    {/* <div className="space-y-4 mb-6">
                      <Label>Choose From Saved Contacts</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Search Groupname or Tags" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="group1">Group One</SelectItem>
                          <SelectItem value="group2">Group Two</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}

                    {/* Added Contact Groups */}
                    <div className="space-y-4">
                      {selectedCSV && <Label>File selected for contacts</Label>}
                      {/* <Label>Added</Label>
                      {campaignData.contactGroups.map((group) => (
                        <div key={group.id} className="border rounded-lg p-3 sm:p-4 flex items-center justify-between transition-colors hover:bg-secondary/20">
                          <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="flex -space-x-2">
                              {group.contacts.slice(0, 3).map((contact) => (
                                <Avatar key={contact.id} className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-background">
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium">{group.name}</p>
                              <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                                <Badge variant="secondary" className="rounded-full text-xs">{group.contacts.length}</Badge>
                                <Badge variant="outline" className="text-xs">
                                  <Cloud className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                                  Cloud
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
                            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Button>
                        </div>
                      ))} */}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    {/* Message Content */}
                    <div className="space-y-4 mb-6">
                      <Label>Message Content</Label>
                      <Controller
                        name="messageContent"
                        control={control}
                        render={({ field }) => (
                          <Textarea 
                            {...field}
                            className={cn("min-h-[120px] resize-none", errors.messageContent ? "border-red-500" : "")}
                            value = {templates[0].body}
                            disabled
                          />
                        )}
                      />
                      {errors.messageContent && <p className="text-red-500 text-sm">{errors.messageContent.message}</p>}
                    </div>

                    {/* Variable Selection */}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label>
                          Choose Variable1 From doc uploaded
                        </Label>
                        <Controller
                          name="variable1"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} />
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          Choose Variable2 From doc uploaded
                        </Label>
                        <Controller
                          name="variable2"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Festival Name" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Festival Name">Festival Name</SelectItem>
                                <SelectItem value="Diwali">Diwali</SelectItem>
                                <SelectItem value="Christmas">Christmas</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div> */}

                    {/* Send Options */}
                    <div className="space-y-4 mb-6">
                      <Controller
                        name="sendType"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup 
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex items-center space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="now" id="now" />
                              <Label htmlFor="now">Send Now</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="schedule" id="schedule" />
                              <Label htmlFor="schedule">Schedule</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />

                      {campaignData.sendType === 'schedule' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Date</Label>
                            <Controller
                              name="scheduleDate"
                              control={control}
                              render={({ field }) => (
                                <Input 
                                  type="date" 
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Controller
                              name="scheduleTime"
                              control={control}
                              render={({ field }) => (
                                <Input 
                                  type="time" 
                                  {...field}
                                />
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" 
                    onClick={handlePrevious}
                    disabled={step === 1}
                    type="button"
                  >
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  {step < 3 ? (
                    <Button variant="outline" size="sm" className="rounded-full text-xs px-4" type="button">
                      <Info className="w-4 h-4 mr-2" />
                      Need Help ?
                    </Button>
                  ) : null}
                  <Button 
                    onClick={step < 3 ? handleNext : submitForm}
                    type={step < 3 ? "button" : "submit"}
                  >
                    {step < 3 ? (
                      <>
                        Next
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </>
                    ) : 'Send Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="mt-8 lg:mt-0 relative mx-auto w-full max-w-[320px] h-[640px] bg-black rounded-[3rem] p-4 shadow-xl hidden lg:block">
            <div className="absolute inset-0 w-full h-full rounded-[2.8rem] overflow-hidden">
              <div className="bg-primary p-3 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <ChevronUp className="w-5 h-5" />
                </Button>
                <div className="w-8 h-8 rounded-full bg-muted" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-foreground flex items-center">
                    Business Name
                    <Check className="w-4 h-4 ml-1" />
                  </p>
                  <p className="text-xs text-primary-foreground/70">online</p>
                </div>
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="bg-[#e5ddd5] h-full p-4 space-y-4 flex flex-col">
                <div className="flex justify-center">
                  <div className="bg-background text-foreground rounded-full px-3 py-1 text-xs shadow">
                    Fri, Jul 26
                  </div>
                </div>
                <div className="bg-background rounded-lg p-3 max-w-[80%] space-y-1 self-start shadow">
                  <p className="text-sm">{selectedTemplate?.body}</p>
                  <p className="text-[10px] text-muted-foreground text-right">11:14 AM</p>
                </div>
                
                <div className="mt-auto space-y-2">
                  <Button className="w-full bg-background text-foreground hover:bg-background/90">
                    <Link2 className="w-4 h-4 mr-2" />
                    Link action
                  </Button>
                  
                  <Button className="w-full bg-background text-foreground hover:bg-background/90">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact us action
                  </Button>

                  <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
                    <p className="font-medium">{campaignData.selectedTemplate}</p>
                    <p>Marketing</p>
                  </div>

                  <div className="bg-background p-2 flex items-center rounded-b-lg">
                    <Button size="sm" variant="ghost">
                      <Smile className="w-5 h-5" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Input 
                      placeholder="Type a message" 
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                    />
                    <Button size="sm" variant="ghost">
                      <Mic className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Dialog for group name input */}
      <Dialog>
        <DialogTrigger asChild>
          <span className="hidden">Open Dialog</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Group Name</DialogTitle>
          </DialogHeader>
          <Input
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter group name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewGroupName('')}>
              Cancel
            </Button>
            <Button onClick={handleSaveGroup}>Save Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}