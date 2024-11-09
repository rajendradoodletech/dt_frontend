"use client"

import React, { useState, useEffect } from 'react'
import { create } from 'zustand'
import { z } from 'zod'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  ChevronUp,
  Download,
  MessageSquare,
  MoreHorizontal,
  FileBarChart,
  Flag,
  Search,
  Filter,
  Plus,
  Users,
  FileText,
  LayoutGrid,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

// Zod schema definitions
const MetricSchema = z.object({
  label: z.string(),
  value: z.number(),
  percentage: z.number(),
  color: z.string()
})

const TrendDataSchema = z.object({
  date: z.string(),
  value: z.number()
})

const CampaignSchema = z.object({
  id: z.string(),
  title: z.string(),
  template: z.string(),
  status: z.string(),
  metrics: z.array(MetricSchema),
  additionalInfo: z.array(z.object({
    label: z.string(),
    value: z.string(),
    bgColor: z.string().optional()
  })),
  responseCount: z.number(),
  performanceTrend: z.array(TrendDataSchema)
})

type Campaign = z.infer<typeof CampaignSchema>

// Updated demo JSON data with 5 campaigns and performance trends
const demoData: Campaign[] = [
  {
    id: "1",
    title: "Black Friday Sale",
    template: "Seasonal Promotion",
    status: "Ongoing",
    metrics: [
      { label: "Sent", value: 10000, percentage: 100, color: "#4338CA" },
      { label: "Queued", value: 300, percentage: 3, color: "#6366F1" },
      { label: "Delivered", value: 9550, percentage: 95.5, color: "#60A5FA" },
      { label: "Read", value: 4701, percentage: 47.01, color: "#34D399" },
      { label: "Interaction", value: 209, percentage: 2.09, color: "#10B981" },
      { label: "Failed", value: 1, percentage: 0.01, color: "#EF4444" }
    ],
    additionalInfo: [
      { label: "Category", value: "Promotional", bgColor: "bg-pink-100" },
      { label: "Template", value: "Seasonal Promotion", bgColor: "bg-green-100" },
      { label: "Total Count", value: "10000", bgColor: "bg-blue-100" },
      { label: "Budget", value: "5,000.00$", bgColor: "bg-green-100" },
      { label: "Start on", value: "24/11/23 00:00" },
      { label: "Ended on", value: "27/11/23 23:59" }
    ],
    responseCount: 2,
    performanceTrend: [
      { date: "2023-11-24", value: 100 },
      { date: "2023-11-25", value: 250 },
      { date: "2023-11-26", value: 380 },
      { date: "2023-11-27", value: 420 }
    ]
  },
  {
    id: "2",
    title: "Summer Clearance",
    template: "Seasonal Sale",
    status: "Scheduled",
    metrics: [
      { label: "Sent", value: 0, percentage: 0, color: "#4338CA" },
      { label: "Queued", value: 15000, percentage: 100, color: "#6366F1" },
      { label: "Delivered", value: 0, percentage: 0, color: "#60A5FA" },
      { label: "Read", value: 0, percentage: 0, color: "#34D399" },
      { label: "Interaction", value: 0, percentage: 0, color: "#10B981" },
      { label: "Failed", value: 0, percentage: 0, color: "#EF4444" }
    ],
    additionalInfo: [
      { label: "Category", value: "Clearance", bgColor: "bg-yellow-100" },
      { label: "Template", value: "Seasonal Sale", bgColor: "bg-green-100" },
      { label: "Total Count", value: "15000", bgColor: "bg-blue-100" },
      { label: "Budget", value: "7,500.00$", bgColor: "bg-green-100" },
      { label: "Start on", value: "01/06/24 00:00" },
      { label: "Ended on", value: "31/08/24 23:59" }
    ],
    responseCount: 0,
    performanceTrend: []
  },
  {
    id: "3",
    title: "Back to School",
    template: "Educational Promotion",
    status: "Ongoing",
    metrics: [
      { label: "Sent", value: 8000, percentage: 100, color: "#4338CA" },
      { label: "Queued", value: 0, percentage: 0, color: "#6366F1" },
      { label: "Delivered", value: 7920, percentage: 99, color: "#60A5FA" },
      { label: "Read", value: 3600, percentage: 45, color: "#34D399" },
      { label: "Interaction", value: 720, percentage: 9, color: "#10B981" },
      { label: "Failed", value: 80, percentage: 1, color: "#EF4444" }
    ],
    additionalInfo: [
      { label: "Category", value: "Educational", bgColor: "bg-blue-100" },
      { label: "Template", value: "Educational Promotion", bgColor: "bg-green-100" },
      { label: "Total Count", value: "8000", bgColor: "bg-blue-100" },
      { label: "Budget", value: "4,000.00$", bgColor: "bg-green-100" },
      { label: "Start on", value: "15/08/24 00:00" },
      { label: "Ended on", value: "05/09/24 23:59" }
    ],
    responseCount: 15,
    performanceTrend: [
      { date: "2024-08-15", value: 50 },
      { date: "2024-08-16", value: 120 },
      { date: "2024-08-17", value: 180 },
      { date: "2024-08-18", value: 220 },
      { date: "2024-08-19", value: 280 }
    ]
  },
  {
    id: "4",
    title: "Customer Feedback Survey",
    template: "Feedback Collection",
    status: "Archived",
    metrics: [
      { label: "Sent", value: 5000, percentage: 100, color: "#4338CA" },
      { label: "Queued", value: 0, percentage: 0, color: "#6366F1" },
      { label: "Delivered", value: 4950, percentage: 99, color: "#60A5FA" },
      { label: "Read", value: 2500, percentage: 50, color: "#34D399" },
      { label: "Interaction", value: 1000, percentage: 20, color: "#10B981" },
      { label: "Failed", value: 50, percentage: 1, color: "#EF4444" }
    ],
    additionalInfo: [
      { label: "Category", value: "Survey", bgColor: "bg-purple-100" },
      { label: "Template", value: "Feedback Collection", bgColor: "bg-green-100" },
      { label: "Total Count", value: "5000", bgColor: "bg-blue-100" },
      { label: "Budget", value: "1,000.00$", bgColor: "bg-green-100" },
      { label: "Start on", value: "01/03/24 00:00" },
      { label: "Ended on", value: "15/03/24 23:59" }
    ],
    responseCount: 1000,
    performanceTrend: [
      { date: "2024-03-01", value: 100 },
      { date: "2024-03-05", value: 300 },
      { date: "2024-03-10", value: 600 },
      { date: "2024-03-15", value: 1000 }
    ]
  },
  {
    id: "5",
    title: "Holiday Gift Guide",
    template: "Seasonal Promotion",
    status: "Scheduled",
    metrics: [
      { label: "Sent", value: 0, percentage: 0, color: "#4338CA" },
      { label: "Queued", value: 20000, percentage: 100, color: "#6366F1" },
      { label: "Delivered", value: 0, percentage: 0, color: "#60A5FA" },
      { label: "Read", value: 0, percentage: 0, color: "#34D399" },
      { label: "Interaction", value: 0, percentage: 0, color: "#10B981" },
      { label: "Failed", value: 0, percentage: 0, color: "#EF4444" }
    ],
    additionalInfo: [
      { label: "Category", value: "Promotional", bgColor: "bg-pink-100" },
      { label: "Template", value: "Seasonal Promotion", bgColor: "bg-green-100" },
      { label: "Total Count", value: "20000", bgColor: "bg-blue-100" },
      { label: "Budget", value: "10,000.00$", bgColor: "bg-green-100" },
      { label: "Start on", value: "01/12/24 00:00" },
      { label: "Ended on", value: "24/12/24 23:59" }
    ],
    responseCount: 0,
    performanceTrend: []
  }
]

// Zustand store
interface CampaignStore {
  campaigns: Campaign[]
  loading: boolean
  error: string | null
  fetchCampaigns: () => void
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  loading: false,
  error: null,
  fetchCampaigns: () => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      setTimeout(() => {
        const validatedData = z.array(CampaignSchema).parse(demoData)
        set({ campaigns: validatedData, loading: false })
      }, 1000)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      set({ error: 'Failed to fetch campaigns', loading: false })
    }
  }
}))

// MetricChart component
const MetricChart: React.FC<Campaign['metrics'][0] & { size?: 'sm' | 'lg' }> = ({ label, value, percentage, color, size = 'lg' }) => {
  const safePercentage = Number(percentage) || 0
  const formattedPercentage = safePercentage < 1 && safePercentage > 0 
    ? safePercentage.toFixed(1) 
    : Math.round(safePercentage).toString()
  
  const data = [
    { name: label, value: safePercentage },
    { name: 'Remaining', value: Math.max(0, 100 - safePercentage) }
  ]
  
  const chartSize = size === 'sm' ? 'w-10 h-10' : 'w-16 h-16'
  
  return (
    <div className={`relative ${chartSize}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            <Cell key={`cell-${label}`} fill={color} />
            <Cell key="cell-remaining" fill="#E6E6E6" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[8px] font-medium">{formattedPercentage}%</span>
      </div>
    </div>
  )
}

// MetricDisplay component
const MetricDisplay: React.FC<Campaign['metrics'][0] & { view: 'grid' | 'list' }> = ({ label, value, percentage, color, view }) => {
  const formatValue = (val: number) => {
    if (val === undefined || val === null || isNaN(val)) return '0'
    return val >= 1000 ? `${(val / 1000).toFixed(1)}K` : val.toString()
  }

  return (
    <div className={`flex flex-col items-center ${view === 'grid' ? 'w-full px-1' : ''}`}>
      <MetricChart label={label} value={value} percentage={percentage} color={color} size={view === 'grid' ? 'sm' : 'lg'} />
      <div className="text-center mt-1">
        <div className={`${view === 'grid' ? 'text-[8px]' : 'text-sm'} text-muted-foreground`}>{label}</div>
        <div className={`${view === 'grid' ? 'text-xs' : 'text-lg'} font-semibold`}>{formatValue(value)}</div>
      </div>
    </div>
  )
}

// Updated ChartSlider component
const ChartSlider: React.FC<{ metrics: Campaign['metrics'] }> = ({ metrics = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showArrows, setShowArrows] = useState(false)

  const visibleMetrics = metrics.slice(currentIndex, currentIndex + 6)

  const nextSlide = () => {
    if (currentIndex + 6 < metrics.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="flex justify-between items-center">
        {visibleMetrics.map((metric) => (
          <div key={metric.label} className="flex-shrink-0 w-1/6 px-1">
            <MetricDisplay {...metric} view="grid" />
          </div>
        ))}
      </div>
      {showArrows && metrics.length > 6 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={nextSlide}
            disabled={currentIndex + 6 >= metrics.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}

// New PerformanceTrend component
const PerformanceTrend: React.FC<{ data: Campaign['performanceTrend'] }> = ({ data }) => {
  if (data.length === 0) {
    return <div className="text-sm text-muted-foreground">No trend data available</div>
  }

  const latestValue = data[data.length - 1].value
  const previousValue = data[0].value
  const trend = latestValue > previousValue ? 'up' : 'down'
  const trendPercentage = ((latestValue - previousValue) / previousValue * 100).toFixed(2)

  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium mr-2">Performance Trend:</span>
        {trend === 'up' ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trendPercentage}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// CampaignCard component
const CampaignCard: React.FC<{ campaign: Campaign; view: 'grid' | 'list' }> = ({ campaign, view }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'bg-green-500 text-white'
      case 'scheduled':
        return 'bg-orange-500 text-white'
      case 'archived':
        return 'bg-gray-500 text-white'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const renderExpandedContent = () => (
    <div className="mt-4 border-t pt-4">
      {campaign.additionalInfo.map((info) => (
        <div key={info.label} className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">{info.label}:</span>
          <span className={`text-sm font-medium px-2 py-1 rounded ${info.bgColor || 'bg-gray-100'}`}>
            {info.value}
          </span>
        </div>
      ))}
      <PerformanceTrend data={campaign.performanceTrend} />
      <div className="flex justify-between mt-4 space-x-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Reports
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" /> Responses{" "}
          <Badge variant="secondary" className="ml-2 bg-green-500 text-white">{campaign.responseCount}</Badge>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log('Download report')}>
              <Download className="mr-2 h-4 w-4" />
              <span>Download Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('View stats')}>
              <FileBarChart className="mr-2 h-4 w-4" />
              <span>View Detailed Statistics</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Set milestone')}>
              <Flag className="mr-2 h-4 w-4" />
              <span>Set a Milestone</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  if (view === 'list') {
    return (
      <Card className="w-full bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">
                {new Date().toLocaleString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </p>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{campaign.title}</h3>
                <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Template: {campaign.template}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          <div className="mt-6 flex justify-between items-start">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {campaign.metrics.map((metric) => (
                <MetricDisplay 
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  percentage={metric.percentage}
                  color={metric.color}
                  view={view}
                />
              ))}
            </div>
          </div>

          {isExpanded && renderExpandedContent()}
        </CardContent>
      </Card>
    )
  }

  // Grid view
  return (
    <Card className="w-full h-full bg-gradient-to-r from-pink-50 to-blue-50 flex flex-col">
      <CardContent className="flex-grow flex flex-col p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold truncate">{campaign.title}</h3>
              <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
            </div>
            <p className="text-sm font-medium mt-1 truncate">
              Template: {campaign.template}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex-shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mb-4">
          <ChartSlider metrics={campaign.metrics} />
        </div>
        {isExpanded && renderExpandedContent()}
      </CardContent>
    </Card>
  )
}

// Main CampaignDashboard component
export default function CampaignDashboard() {
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [status, setStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const { campaigns, loading, error, fetchCampaigns } = useCampaignStore()

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  const filterOptions = [
    { label: 'Status', options: ['Ongoing', 'Scheduled', 'Archived'] },
    { label: 'Template', options: ['Seasonal Promotion', 'Seasonal Sale', 'Educational Promotion', 'Feedback Collection'] },
    { label: 'Category', options: ['Promotional', 'Clearance', 'Educational', 'Survey'] },
  ]

  const filteredCampaigns = campaigns.filter(campaign => 
    (status === 'All' || campaign.status === status) &&
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedFilters.length === 0 || selectedFilters.some(filter => 
      campaign.status === filter ||
      campaign.template === filter ||
      campaign.additionalInfo.some(info => info.value === filter)
    ))
  )

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            {['All', 'Ongoing', 'Scheduled', 'Drafts', 'Archives'].map((tab) => (
              <Button
                key={tab}
                variant={status === tab ? "default" : "ghost"}
                className={status === tab ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                onClick={() => setStatus(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Start New Campaign
            </Button>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              <FileText className="mr-2 h-4 w-4" />
              Create New Template
            </Button>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              <Users className="mr-2 h-4 w-4" />
              Add Bulk Contacts
            </Button>
            <div className="flex border rounded-lg">
              <Button
                variant={view === 'list' ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setView('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'grid' ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setView('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Campaigns"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters for larger screens */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {filterOptions.map((filterGroup) => (
              <DropdownMenu key={filterGroup.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-green-50">
                    {filterGroup.label} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {filterGroup.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={selectedFilters.includes(option)}
                      onCheckedChange={() => toggleFilter(option)}
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Filters dropdown for medium and smaller screens */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-green-50">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {filterOptions.map((filterGroup, index) => (
                  <React.Fragment key={filterGroup.label}>
                    {index > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuLabel>{filterGroup.label}</DropdownMenuLabel>
                    {filterGroup.options.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option}
                        checked={selectedFilters.includes(option)}
                        onCheckedChange={() => toggleFilter(option)}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <Button variant="outline" className="bg-green-50">
              Recent <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Display active filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="bg-green-100 text-green-800">
                {filter}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-4 w-4 p-0"
                  onClick={() => toggleFilter(filter)}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600"
              onClick={() => setSelectedFilters([])}
            >
              Clear all
            </Button>
          </div>
        )}

        <div className={`grid gap-6 ${
  view === 'grid' 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
    : 'grid-cols-1'
}`}>
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} view={view} />
          ))}
        </div>
      </div>
    </div>
  )
}

