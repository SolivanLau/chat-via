import { Request, Response, NextFunction } from 'express';
import admin from '../firebaseConfig';
import { CustomApiError } from '../errors/customError';

export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authtoken } = req.headers;

  // verify request with proper authToken
  if (typeof authtoken === 'string') {
    // verify via firebase
    try {
      const verify = await admin.auth().verifyIdToken(authtoken);
      // unauthorized error
      if (!verify) {
        throw new CustomApiError('not authorized to use this route', 403);
      }
      // authorized to move to endpoint function
      next();
    } catch (error: any) {
      // ERROR: Firebase id token verification FAILED
      throw new CustomApiError(
        'id token verification failed - not authorized',
        403,
        error as Record<string, any>
      );
    }
  } else {
    // ERROR: Client side token submission FAILED

    throw new CustomApiError('token not valid', 401);
  }
};
