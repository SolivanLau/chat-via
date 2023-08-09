import { Request, Response, NextFunction } from 'express';
import admin from '../firebaseConfig';
import { CustomApiError } from '../errors/customError';

export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // verify request with Bearer authToken
  if (typeof authHeader === 'string') {
    const [scheme, token] = authHeader.split(' ');

    if (scheme === 'Bearer') {
      // verify via firebase
      try {
        const verify = await admin.auth().verifyIdToken(token);
        // unauthorized error
        if (!verify) {
          throw new CustomApiError('not authorized to use this route', 403);
        }
        // authorized to move to endpoint function
        next();
      } catch (error: any) {
        // ERROR: Firebase id token verification FAILED
        throw new CustomApiError(
          'not authorized - token verification failed',
          403,
          error.code as Record<string, any>
        );
      }
    } else {
      // ERROR: Client side token submission FAILED

      throw new CustomApiError('invalid token', 401);
    }
  } else {
    // ERROR: Client side token submission FAILED

    throw new CustomApiError('invalid token', 401);
  }
};
