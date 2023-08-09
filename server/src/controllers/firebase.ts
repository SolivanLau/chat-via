import { NextFunction, Request, Response } from 'express';
import admin from '../firebaseConfig';
import { CustomApiError } from '../errors/customError';
import { dbAddUser } from './db';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get items from req.body
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw new CustomApiError('make sure all fields are submitted', 400, {
      userName,
      email,
      password,
    });
  }

  // create user via firebase
  try {
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: userName,
    });

    // add userinfo to server
    const dbUser = await dbAddUser(userName, email, firebaseUser.uid);

    // return success response
    return res.json({ success: true, details: dbUser });
  } catch (error) {
    // ERROR: firebase or db error
    throw new CustomApiError(
      'could not create user',
      500,
      error as Record<string, any>
    );
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ success: true });
};
