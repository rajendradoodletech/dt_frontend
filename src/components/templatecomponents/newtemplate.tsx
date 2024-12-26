'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { create } from 'zustand'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Bold, Italic, SmilePlus, Image as ImageIcon, FileText, Video, Phone, Link } from 'lucide-react'
import data from '@emoji-mart/data'
import dynamic from 'next/dynamic'
import { debounce } from 'lodash'
const backendAPI = "http://localhost:8000"

const Picker = dynamic(() => import('@emoji-mart/react'), { ssr: false })

const formSchema = z.object({
  // templateName: z.string().min(1, "Template name is required"),
  // category: z.string().min(1, "Category is required"),
  // language: z.string().min(1, "Language is required"),
  // templateType: z.enum(["standard", "media"]),
  // content: z.string().min(1, "Content is required").refine((val) => val.trim() !== '', {
  //   message: "Content cannot be empty",
  // }),
  // showHeader: z.boolean(),
  // showButtons: z.boolean(),
  // showFooter: z.boolean(),
  // headerType: z.enum(["text", "image", "video", "document"]).optional(),
  // headerContent: z.string().optional(),
  // buttonCount: z.number().min(1).max(4).default(1),
  // footerContent: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface TemplateStore {
  content: string
  showCelebration: boolean
  variableCount: number
  setContent: (content: string) => void
  setShowCelebration: (show: boolean) => void
  incrementVariableCount: () => void
}

const useTemplateStore = create<TemplateStore>((set) => ({
  content: '',
  showCelebration: false,
  variableCount: 0,
  setContent: (content) => set({ content }),
  setShowCelebration: (show) => set({ showCelebration: show }),
  incrementVariableCount: () => set((state) => ({ variableCount: state.variableCount + 1 })),
}))

export default function TemplateCreator() {
  const { control, handleSubmit, watch, setValue, trigger, formState: { errors, isSubmitting, isDirty, isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      templateType: 'standard',
      showHeader: false,
      showButtons: false,
      showFooter: false,
      headerType: 'text',
      buttonCount: 1,
      content: '',
      templateName: '',
      category: '',
      language: ''
    }
  })

  const { showCelebration, variableCount, setShowCelebration, incrementVariableCount, setContent } = useTemplateStore()
  const contentRef = useRef<HTMLDivElement>(null)
  const [localContent, setLocalContent] = useState('')

  const [templateFile, setTemplateFile] = useState(false)

  const templateType = watch('templateType')
  const showHeader = watch('showHeader')
  const showButtons = watch('showButtons')
  const showFooter = watch('showFooter')
  const headerType = watch('headerType')
  const buttonCount = watch('buttonCount') || 1;

  const handleContentChange = useCallback(
    debounce((e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.target.innerHTML
      setLocalContent(newContent)
      setValue('content', newContent, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true 
      })
      setContent(newContent)
      trigger('content')
    }, 8000),
    [setValue, setContent, trigger]
  )

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = localContent
    }
  }, [localContent])

  useEffect(() => {
    trigger()
  }, [trigger])

  const handleBold = useCallback(() => {
    document.execCommand('bold', false)
    if (contentRef.current) {
      handleContentChange({ currentTarget: contentRef.current } as React.FormEvent<HTMLDivElement>)
    }
  }, [handleContentChange])

  const handleItalic = useCallback(() => {
    document.execCommand('italic', false)
    if (contentRef.current) {
      handleContentChange({ currentTarget: contentRef.current } as React.FormEvent<HTMLDivElement>)
    }
  }, [handleContentChange])

  const handleEmojiSelect = useCallback((emoji: { native: string }) => {
    document.execCommand('insertText', false, emoji.native)
    if (contentRef.current) {
      handleContentChange({ currentTarget: contentRef.current } as React.FormEvent<HTMLDivElement>)
    }
  }, [handleContentChange])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = Array.from(e.dataTransfer.files)
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
            const img = document.createElement('img')
            img.src = event.target.result
            img.style.maxWidth = '100%'
            document.execCommand('insertHTML', false, img.outerHTML)
            if (contentRef.current) {
              handleContentChange({ currentTarget: contentRef.current } as React.FormEvent<HTMLDivElement>)
            }
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }, [handleContentChange])

  const fileChangeHandler = (event) => {
    setTemplateFile(event.target.files[0])
  }

  const onSubmit = async (data: FormData) => {
    console.log("Create template")
    console.log(watch())
    let fData = watch()
    const formData = new FormData();

    Object.keys(fData).forEach((key) => {
      if (Array.isArray(fData[key])) {
        // Handle arrays (e.g., buttons)
        fData[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, JSON.stringify(item));
        });
      } else {
        // Handle other key-value pairs
        formData.append(key, fData[key]);
      }
    });
    if (templateFile){
      formData.append("templateFile", templateFile)
    }

    // Debugging: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios.post(`${backendAPI}/template/create`, formData)
    .then(res => {
      setShowCelebration(true)
    })
    .catch(err => {
      alert("Something went wrong")
    })
  }

  const renderHeaderInput = () => {
    switch (headerType) {
      case 'text':
        return <Controller
          name="headerContent"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Enter header text" />}
        />
      case 'image':
        return (
          <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
            <label>
              <div className="flex justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Add Image</p>
                <p className="text-xs text-gray-400">JPG. Max 5MB</p>
                <p className="text-xs text-gray-400">Recommended Dimension 300 x 600px</p>
              </div>
              <input type = "file" name = "image" style = {{height: "0px", visibility: "hidden"}} onChange={fileChangeHandler}/>
            </label>
          </div>
        )
      case 'video':
        return (
          <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
            <div className="flex justify-center">
              <Video className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Add Video</p>
              <p className="text-xs text-gray-400">MP4. Max 16MB</p>
              <input type = "file" name = "video" style = {{height: "0px", visibility: "hidden"}} onChange={fileChangeHandler}/>
            </div>
          </div>
        )
      case 'document':
        return (
          <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
            <div className="flex justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Add Document</p>
              <p className="text-xs text-gray-400">PDF, DOC. Max 100MB</p>
              <input type = "file" name = "document" style = {{height: "0px", visibility: "hidden"}} onChange={fileChangeHandler}/>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderButtonInputs = () => {
    const buttons = []
    for (let i = 0; i < buttonCount; i++) {
      buttons.push(
        <div key={i} className="space-y-4 border p-4 rounded-md">
          <Controller
            name={`buttons.${i}.type` as any}
            control={control}
            defaultValue="url"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Button type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick_reply">Quick Reply</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="phone">Phone Number</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {watch(`buttons.${i}.type` as any) === 'url' && (
            <>
              <Controller
                name={`buttons.${i}.label` as any}
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="Button Label" />}
              />
              <Controller
                name={`buttons.${i}.url` as any}
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="Enter URL" />}
              />
            </>
          )}
          {watch(`buttons.${i}.type` as any) === 'quick_reply' && (
            <>
              <Controller
                name={`buttons.${i}.label` as any}
                control={control}
                defaultValue="Quick Reply"
                render={({ field }) => <Input {...field} placeholder="Label eg: I like this" />}
              />
            </>
          )}
          {watch(`buttons.${i}.type` as any) === 'phone' && (
            <>
              <Controller
                name={`buttons.${i}.label` as any}
                control={control}
                defaultValue="Call Now"
                render={({ field }) => <Input {...field} placeholder="Label eg: Call now" />}
              />
              <Controller
                name={`buttons.${i}.phone` as any}
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="Enter Phone Number" />}
              />
            </>
          )}
        </div>
      )
    }
    return buttons
  }

  const handleAddVariable = useCallback(() => {
    const newVariable = `{{${variableCount + 1}}}`
    document.execCommand('insertText', false, newVariable)
    if (contentRef.current) {
      handleContentChange({ currentTarget: contentRef.current } as React.FormEvent<HTMLDivElement>)
    }
    incrementVariableCount()
  }, [variableCount, handleContentChange, incrementVariableCount])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-8">Create New template</h1>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="templateName" className="text-green-600">Template Name</Label>
            <Controller
              name="templateName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter template name"
                  className="hover:border-green-400 transition-colors duration-200"
                />
              )}
            />
            {errors.templateName && <p className="text-red-500 text-sm">{errors.templateName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className={`text-green-600 ${errors.category ? 'text-red-500' : ''}`}>Template Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={`${errors.category ? 'border-red-500' : ''} hover:border-green-400 transition-colors duration-200`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className={`text-green-600 ${errors.language ? 'text-red-500' : ''}`}>Template Language</Label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={`${errors.language ? 'border-red-500' : ''} hover:border-green-400 transition-colors duration-200`}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en_US">English</SelectItem>
                    <SelectItem value="es_ES">Spanish</SelectItem>
                    <SelectItem value="fr_FR">French</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className={`text-green-600 ${errors.templateType ? 'text-red-500' : ''}`}>Template Type</Label>
            <Controller
              name="templateType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={`${errors.templateType ? 'border-red-500' : ''} hover:border-green-400 transition-colors duration-200`}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.templateType && <p className="text-red-500 text-sm">{errors.templateType.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label className={`text-green-600 ${errors.content ? 'text-red-500' : ''}`}>Template Content</Label>
          <div className="border rounded-md p-4 space-y-4">
            <div
              className={`min-h-[100px] p-2 border rounded-md ${errors.content ? 'border-red-500' : ''} hover:border-green-400 transition-colors duration-200`}
              contentEditable
              onInput={handleContentChange}
              ref={contentRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              dangerouslySetInnerHTML={{ __html: localContent }}
              style={{
                direction: 'ltr',
                textAlign: 'left',
                unicodeBidi: 'plaintext',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

            <div className="flex items-center gap-4">
              <Button type="button" variant="ghost" size="icon" className="text-green-600 hover:bg-green-100 transition-colors duration-200" onClick={handleBold}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-green-600 hover:bg-green-100 transition-colors duration-200" onClick={handleItalic}>
                <Italic className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="text-green-600 hover:bg-green-100 transition-colors duration-200">
                    <SmilePlus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="light"
                    set="native"
                    previewPosition="none"
                    skinTonePosition="none"
                    categories={[
                      'frequent',
                      'people',
                      'nature',
                      'foods',
                      'activity',
                      'places',
                      'objects',
                      'symbols',
                      'flags'
                    ]}
                  />
                </PopoverContent>
              </Popover>
              {/* <Button type="button" variant="outline" className="text-green-600 hover:bg-green-50 transition-all duration-200 ease-in-out hover:scale-105" onClick={handleAddVariable}>
                Add Variable
              </Button> */}
            </div>
          </div>
        </div>

        {templateType === 'media' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-green-600">Add Media Template features</Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <h3 className="font-semibold">Header</h3>
                    <p className="text-sm text-gray-500">Add a header to your template</p>
                  </div>
                  <Controller
                    name="showHeader"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200 hover:data-[state=unchecked]:bg-gray-300 transition-colors duration-200"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <h3 className="font-semibold">Buttons</h3>
                    <p className="text-sm text-gray-500">Add buttons to your template</p>
                  </div>
                  <Controller
                    name="showButtons"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200 hover:data-[state=unchecked]:bg-gray-300 transition-colors duration-200"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <h3 className="font-semibold">Footer</h3>
                    <p className="text-sm text-gray-500">Add a footer to your template</p>
                  </div>
                  <Controller
                    name="showFooter"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200 hover:data-[state=unchecked]:bg-gray-300 transition-colors duration-200"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {showHeader && (
              <div className="space-y-4">
                <Label className="text-green-600">Header</Label>
                <Controller
                  name="headerType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select header type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                {renderHeaderInput()}
              </div>
            )}

            {showButtons && (
              <div className="space-y-4">
                <Label className="text-green-600">Buttons</Label>
                <Controller
                  name="buttonCount"
                  control={control}
                  render={({ field }) => (
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value, 10))} 
                      defaultValue={field.value?.toString() || "1"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Number of buttons" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">One</SelectItem>
                        <SelectItem value="2">Two</SelectItem>
                        <SelectItem value="3">Three</SelectItem>
                        <SelectItem value="4">Four</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                {renderButtonInputs()}
              </div>
            )}

            {showFooter && (
              <div className="space-y-4">
                <Label className="text-green-600">Footer</Label>
                <Controller
                  name="footerContent"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Enter footer text" />}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <Button 
            type="submit" 
            className="bg-green-600 text-white hover:bg-green-700 transition-all duration-200 ease-in-out hover:scale-105" 
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </Button>
          <Button type="button" variant="outline" className="text-green-600 hover:bg-green-50 transition-all duration-200 ease-in-out hover:scale-105">
            Need Help ? ℹ️
          </Button>
        </div>

      </div>

      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Congratulations! 🎉</DialogTitle>
            <DialogDescription>
              Your template has been successfully submitted for verification.
              <p className="mt-2 text-lg font-semibold">Normally the action takes 5 minutes</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center h-40 relative overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-500 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </form>
  )
}