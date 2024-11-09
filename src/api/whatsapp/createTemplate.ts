import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from '@/lib/utils/axiosConfig';
import { validateRequest } from '@/lib//utils/validateRequest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const requiredFields = ['name', 'language', 'components'];
    if (!validateRequest(req, res, requiredFields)) return;

    const { name, language, components } = req.body;
    const data = {
      name: name,
      language: language,
      components: components
    };

    try {
      const response = await axiosInstance.post(`https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}/message_templates`, data);
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error creating template:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to create template' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
