import { NextFunction, Request, Response } from 'express';
import admin from '../firebaseConfig';
import { CustomApiError } from '../errors/customError';
import { dbAddUser, dbGetSingleUser, dbGetUsers } from './db';
interface CreateUserRequestBody {
  userName: string;
  email: string;
  password: string;
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get items from req.body
  const { userName, email, password } = req.body as CreateUserRequestBody;

  // ERROR: if there are empty fields
  if (!userName || !email || !password) {
    throw new CustomApiError('make sure all fields are submitted', 400, {
      userName,
      email,
      password,
    });
  }

  const cleanEmail = email.toLocaleLowerCase();
  const cleanUserName = userName.toLocaleLowerCase();

  // create user via firebase
  try {
    const firebaseUser = await admin.auth().createUser({
      email: cleanEmail,
      password,
      displayName: cleanUserName,
    });

    // add userinfo to db
    const dbUser = await dbAddUser(cleanUserName, cleanEmail, firebaseUser.uid);

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
  try {
    // users from db
    const users = await dbGetUsers();
    res.json({ success: true, details: users });
  } catch (error) {
    throw new CustomApiError(
      'unable to get users from database',
      500,
      error as Record<string, any>
    );
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.params;

  try {
    const user = await dbGetSingleUser(uid);
    if (!user) {
      throw new CustomApiError(`unable to find user with uid:${uid}`, 400);
    }
    return res.json({ success: true, details: user });
  } catch (error) {
    throw new CustomApiError(
      'unable to get user',
      500,
      error as Record<string, any>
    );
  }
};
