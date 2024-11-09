import { NextApiRequest, NextApiResponse } from 'next';

export const validateRequest = (req: NextApiRequest, res: NextApiResponse, requiredFields: string[]): boolean => {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).json({ error: `Missing field: ${field}` });
      return false;
    }
  }
  return true;
};
