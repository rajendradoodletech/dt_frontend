"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import Papa from "papaparse";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MessageTemplate {
  id: string;
  name: string;
  body: string;
  header?: string;
  footer?: string;
  buttons?: Array<{ type: string; text: string; url?: string }>;
  language: string;
  locale: string;
}

interface Campaign {
  name: string;
  message: string;
  audience: string;
  templateId: string;
  templateVariables: string[];
}

interface Audience {
  name: string;
  contacts: string[];
}

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const methods = useForm<Campaign>({
    defaultValues: {
      name: "",
      message: "",
      audience: "",
      templateId: "",
      templateVariables: []
    }
  });

  const { handleSubmit, control, reset } = methods;

  // Load dummy data from JSON file
  useEffect(() => {
    fetch("/data/dummyCampaigns.json")
      .then(response => response.json())
      .then(data => setCampaigns(data));
  }, []);

  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>([
    {
      id: "1",
      name: "Template 1",
      body: "Hello {{1}}, your order {{2}} has been shipped.",
      language: "en",
      locale: "US",
    },
    {
      id: "2",
      name: "Template 2",
      body: "Hi {{1}}, your appointment is confirmed for {{2}}.",
      language: "en",
      locale: "US",
    },
    // Add more templates as needed
  ]);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const contacts = results.data.map((row: any) => row[0]); // Assuming contacts are in the first column
          const audienceName = prompt("Please enter a name for the new audience");
          if (audienceName) {
            setAudiences([...audiences, { name: audienceName, contacts }]);
          }
        }
      });
    }
  };

  const sendWhatsAppMessage = async (message: string, contacts: string[]) => {
    const url = `${process.env.NEXT_PUBLIC_WHATSAPP_API_URL}/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    };

    const promises = contacts.map(contact => {
      const data = {
        messaging_product: "whatsapp",
        to: contact,
        type: "text",
        text: { body: message }
      };
      return axios.post(url, data, { headers });
    });

    try {
      await Promise.all(promises);
      alert("Messages sent successfully!");
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages.");
    }
  };

  const handleFormSubmit = (data: Campaign) => {
    setCampaigns([...campaigns, data]);
    reset();
  };

  const handleSendCampaign = (campaign: Campaign) => {
    const audience = audiences.find(a => a.name === campaign.audience);
    if (audience) {
      sendWhatsAppMessage(campaign.message, audience.contacts);
    } else {
      alert("Audience not found.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Create Campaign Card */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Create Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormItem>
                  <FormLabel htmlFor="template">Message Template</FormLabel>
                  <FormControl>
                    <Controller
                      name="templateId"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select message template" />
                          </SelectTrigger>
                          <SelectContent>
                            {messageTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor="variables">Template Variables</FormLabel>
                  <FormControl>
                    <Controller
                      name="templateVariables"
                      control={control}
                      render={({ field }) => (
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter variables separated by commas"
                          required
                        />
                      )}
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="name">Campaign Name</FormLabel>
                  <FormControl>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => <Input {...field} placeholder="Enter campaign name" required />}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <FormControl>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => <Input {...field} placeholder="Enter campaign message" required />}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor="audience">Audience</FormLabel>
                  <FormControl>
                    <Controller
                      name="audience"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                          <SelectContent>
                            {audiences.map((audience, index) => (
                              <SelectItem key={index} value={audience.name}>{audience.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormControl>
                </FormItem>
                <Button type="submit">Create Campaign</Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>

        {/* Manage Campaigns Card */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Manage Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.message}</TableCell>
                    <TableCell>{campaign.audience}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleSendCampaign(campaign)}>Send</Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        setCampaigns(campaigns.filter((_, i) => i !== index));
                      }}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Import Contacts Card */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Import Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <input type="file" accept=".csv" onChange={handleCSVUpload} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
