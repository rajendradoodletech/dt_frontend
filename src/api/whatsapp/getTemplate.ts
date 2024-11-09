import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from '@/lib/utils/axiosConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { templateName } = req.query;

  try {
    const response = await axiosInstance.delete(`https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}/message_templates?name=${templateName}`);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error deleting template:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to delete template' });
  }
}
