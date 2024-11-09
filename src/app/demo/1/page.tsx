"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Users, MessageSquare } from 'lucide-react';

const ChatDashboard = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, sender: 'John', content: 'Hey there!', time: '10:00 AM' },
    { id: 2, sender: 'Jane', content: 'Hi John, how are you?', time: '10:02 AM' },
    { id: 3, sender: 'John', content: 'I\'m doing great, thanks for asking!', time: '10:05 AM' },
  ]);

  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObject = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Chat Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Currently online users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2" />
              <span className="text-2xl font-bold">42</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Messages</CardTitle>
            <CardDescription>Messages sent today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="mr-2" />
              <span className="text-2xl font-bold">1,024</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Average messages per user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="mr-2" />
              <span className="text-2xl font-bold">24.3</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((message) => (
              <div key={message.id} className="flex mb-4">
                <Avatar className="mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{message.sender}</div>
                  <div>{message.content}</div>
                  <div className="text-sm text-gray-500">{message.time}</div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex mt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatDashboard;
