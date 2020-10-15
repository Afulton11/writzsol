/* eslint-disable no-param-reassign */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  res.statusCode = 200;
  res.json({ name: name ?? 'John Doe' });
};
