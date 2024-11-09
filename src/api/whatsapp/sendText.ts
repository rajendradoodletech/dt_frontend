import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import axiosInstance from '@/lib/utils/axiosConfig'; 
import { validateRequest } from '@/lib/utils/validateRequest';

type Data = { status: string; to: string; message: string; timestamp: string } | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const requiredFields = ['to', 'message'];
    if (!validateRequest(req, res, requiredFields)) return;

    const { to, message } = req.body;
    const data: Data = {
      status: 'success', // Example value for status
      to: to,
      message: message,
      timestamp: '2024-07-23T13:14:06.128841Z', // Example value for timestamp
    };

    // Your existing code continues here
    // Ensure to handle the error case as well if needed
  }
}
