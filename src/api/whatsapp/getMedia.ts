import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from '@/lib/utils/axiosConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { mediaId } = req.query;

  try {
    const response = await axiosInstance.get(`https://graph.facebook.com/v20.0/${mediaId}`);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching media:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
}
