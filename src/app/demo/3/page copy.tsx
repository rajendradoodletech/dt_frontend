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

console.log(Card, Button, Input, Select, Form); // Add this for debugging

interface Campaign {
  name: string;
  message: string;
  audience: string;
  template: string;
}

interface Audience {
  name: string;
  contacts: string[];
}

const templates = [
  { id: '1', name: 'Template 1', content: 'This is the content of template 1' },
  { id: '2', name: 'Template 2', content: 'This is the content of template 2' },
  // Add more templates as needed
];

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const methods = useForm<Campaign>({
    defaultValues: {
      name: "",
      message: "",
      audience: "",
      template: ""
    }
  });

  const { handleSubmit, control, reset, watch, setValue } = methods;
  const selectedTemplate = watch('template');

  useEffect(() => {
    fetch("/data/dummyCampaigns.json")
      .then(response => response.json())
      .then(data => setCampaigns(data));
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        setValue('message', template.content);
      }
    }
  }, [selectedTemplate, setValue]);

  const handleFormSubmit = (data: Campaign) => {
    setCampaigns([...campaigns, data]);
    reset();
  };

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
                  <FormLabel htmlFor="template">Template</FormLabel>
                  <FormControl>
                    <Controller
                      name="template"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
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

