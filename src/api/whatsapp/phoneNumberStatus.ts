import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from   '@/lib/utils/axiosConfig';

type Data = { status: string; phoneNumber: string; statusDetails: object } | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { phoneNumber } = req.query;

    if (!phoneNumber || typeof phoneNumber !== 'string') {
      res.status(400).json({ error: 'Missing or invalid phone number' });
      return;
    }

    try {
      const response = await axiosInstance.get(`https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}/phone_numbers/${phoneNumber}`);
      res.status(200).json({
        status: 'success',
        phoneNumber: phoneNumber,
        statusDetails: response.data
      });
    } catch (error: any) {
      console.error('Error fetching phone number status:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch phone number status' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
