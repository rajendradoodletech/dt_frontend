"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import Papa from "papaparse";
import axiosInstance from '@/lib/utils/axiosConfig';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from  "@/components/ui/select";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Campaign {
  name: string;
  message: string;
  audience: string;
  template: string;
}
interface AudienceResponse {
  contacts: string[];
  // Add other properties if needed
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
    // You can add any initial API data fetching here if needed
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        setValue('message', template.content);
      }
    }
  }, [selectedTemplate, setValue]);

  const handleFormSubmit = async (data: Campaign) => {
    try {
      const components = [
        {
          type: "BODY",
          text: data.message,
        }
      ];
      await axiosInstance.post('/api/whatsapp/createTemplate', {
        name: data.name,
        language: "en_US",
        components
      });
      reset();
    } catch (error: any) {
      console.error('Error creating template:', error.response?.data || error.message);
      alert('Failed to create campaign template');
    }
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
    const url = '/api/whatsapp/sendText';
    const promises = contacts.map(contact => {
      return axiosInstance.post(url, { to: contact, message });
    });

    try {
      await Promise.all(promises);
      alert("Messages sent successfully!");
    } catch (error: any) {
      console.error("Error sending messages:", error.response?.data || error.message);
      alert("Failed to send messages.");
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
            <p>No campaigns available</p>
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
