import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { status: string; from: string; message: string; timestamp: string } | { error: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { from, message } = req.body;
    const response = {
      status: 'received',
      from: from,
      message: message,
      timestamp: new Date().toISOString()
    };
    res.status(200).json(response);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
