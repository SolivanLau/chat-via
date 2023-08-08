import { NextFunction, Request, Response } from 'express';
import admin from '../firebaseConfig.js';
import { CustomApiError } from '../errors/customError.js';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authtoken } = req.headers;
  const { userId } = req.params;
  if (typeof authtoken === 'string') {
    try {
      const verify = await admin.auth().verifyIdToken(authtoken);
      if (verify) {
        res.json({ success: true });
      } else {
        throw new CustomApiError('not authorized', 401);
      }
    } catch (error: any) {
      throw new CustomApiError(`${error.message}`, 401);
    }
  } else {
    throw new CustomApiError('token not valid', 401);
  }
};
