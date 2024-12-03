// pages/dashboard.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Types
interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
}

// Mock API functions (replace with actual API calls)
const fetchChats = async (): Promise<Chat[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', participants: [{ id: '1', name: 'Alice', avatar: '' }, { id: '2', name: 'Bob', avatar: '' }] },
    { id: '2', participants: [{ id: '1', name: 'Alice', avatar: '' }, { id: '3', name: 'Charlie', avatar: '' }] },
  ];
};

const fetchMessages = async (chatId: string): Promise<Message[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', senderId: 'Alice', content: 'Hello!', timestamp: new Date() },
    { id: '2', senderId: 'Bob', content: 'Hi there!', timestamp: new Date() },
    { id: '1', senderId: 'Alice', content: 'Hi!', timestamp: new Date() },
  ];
};

const sendMessageAPI = async (chatId: string, content: string): Promise<Message> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: Date.now().toString(), senderId: '1', content, timestamp: new Date() };
};

export default function Dashboard() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchChatList = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedChats = await fetchChats();
      setChats(fetchedChats);
      if (fetchedChats.length > 0 && !selectedChat) {
        setSelectedChat(fetchedChats[0].id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch chats. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedChat, toast]);

  const fetchChatMessages = useCallback(async (chatId: string) => {
    try {
      setIsLoading(true);
      const fetchedMessages = await fetchMessages(chatId);
      setMessages(fetchedMessages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  useEffect(() => {
    if (selectedChat) {
      fetchChatMessages(selectedChat);
    }
  }, [selectedChat, fetchChatMessages]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      try {
        const sentMessage = await sendMessageAPI(selectedChat, newMessage);
        setMessages(prevMessages => [...prevMessages, sentMessage]);
        setNewMessage("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Chats</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ul>
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    className={`cursor-pointer p-2 ${selectedChat === chat.id ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    {chat.participants.map(p => p.name).join(', ')}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Current Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] mb-4">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="flex items-start mb-4">
                    <Avatar className="mr-2">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
                      <AvatarFallback>{message.senderId[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{message.senderId}</p>
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500">{message.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
            <div className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-grow mr-2"
              />
              <Button onClick={sendMessage} disabled={!selectedChat || isLoading}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
