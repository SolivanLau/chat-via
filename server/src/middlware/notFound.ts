import { NextFunction, Request, Response } from 'express';
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('resource not found');
};

export default notFound;
