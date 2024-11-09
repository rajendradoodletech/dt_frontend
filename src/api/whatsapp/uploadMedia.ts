import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'public', 'path-to-your-media-file');
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN}`,
        ...formData.getHeaders()
      }
    };
    try {
      const response = await axios.post(`https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}/media`, formData, config);
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error uploading media:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to upload media' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
