// ChatComponent.tsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { QueryClientProvider, QueryClient, useQuery,useMutation } from '@tanstack/react-query';
import { Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toast } from '@radix-ui/react-toast';// Ensure these components are correctly imported

// Replace with your actual token and phone number ID
const API_TOKEN = 'YOUR_API_TOKEN';
const PHONE_NUMBER_ID = 'YOUR_PHONE_NUMBER_ID';
//create a new query client and provider
const queryClient = new QueryClient();
// Create an axios instance for WhatsApp API interactions
const api = axios.create({
  baseURL: 'https://graph.facebook.com/v20.0',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Function to send a message via WhatsApp API
const sendMessage = async (to: string, message: string) => {
  try {
    const response = await api.post(`/v20.0/${PHONE_NUMBER_ID}/messages`, {
      messaging_product: 'whatsapp',
      to,
      text: { body: message },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Main Chat Component
const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState('');

  // Use TanStack Query's useMutation for sending messages
  const mutation = useMutation({
    mutationFn: (data: { to: string; message: string }) => sendMessage(data.to, data.message),
    onSuccess: () => {
      setMessage(''); // Clear message input after sending
      setStatus('Message sent successfully!');
    },
    onError: () => {
      setStatus('Failed to send message.');
    },
  });

  // Handle message sending
  const handleSendMessage = () => {
    setStatus(''); // Clear previous status
    mutation.mutate({ to: recipient, message });
  };

  return (
    <div className="chat-component p-4">
      <div className="input-group mb-4 flex flex-col gap-2">
        <Input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient phone number"
          className="input-field"
        />
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input-field"
        />
        <Button
          onClick={handleSendMessage}
          disabled={mutation.isLoading}
          className="send-button"
        >
          {mutation.isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
      {status && (
        <Toast>
          {status}
        </Toast>
      )}
    </div>
  );
};

export default ChatComponent;
