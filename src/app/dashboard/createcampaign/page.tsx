import { FC } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

import NewCampaign from "@/components/campaigncomponents/newcampaign"




const Campaign: FC = () => {
  return (
    <div className="flex container flex-col h-screen w-full mx-auto md:flex-row gap-2 ">
    <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:px-6 sm:py-0">
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-none">{/* <CampaignCreator/>  <CampaignCreatorComponent/>*/}<NewCampaign></NewCampaign></Card>
    {/*<Card className="col-span-1 md:col-span-2 lg:col-span-1 border-none">Hello</Card>*/}
    
    
    </main>
    </div>
    
  )
}

export default Campaign


// Commit: Add create campaign page, add new campaign component, add campaign components folder, add newcampaign component, add campaigncreator component, add campaigncreatorcomponent, add campaign components to createcampaign page, add createcampaign page to dashboard, add link to createcampaign page in dashboard sidebar
