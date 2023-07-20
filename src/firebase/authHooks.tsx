import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

import { useNavigate } from 'react-router-dom';

const errorMsgArr = [
  {
    code: 'auth/user-not-found',
    message: 'No account with this email. Sign up or try again',
  },
  {
    code: 'auth/invalid-email',
    message: 'Invalid email. Please try again',
  },
  {
    code: 'auth/wrong-password',
    message: 'Wrong email or password. Please try again',
  },
  {
    code: 'auth/email-already-in-use',
    message: 'Wrong email or password. Please try again',
  },
];

const generateErrMsg = (err: any) => {
  const errCode = err.code;

  const errObj = errorMsgArr.find((obj) => obj.code === errCode);
  return errObj ? errObj.message : 'Unexpected error... Please try again later';
};

export const useSignUp = async (
  userName: string,
  email: string,
  password: string
) => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCred.user;
    console.log(user);
  } catch (error: any) {
    throw new Error(generateErrMsg(error));
  }
};

export const useSignIn = async (email: string, password: string) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    console.log(user);
  } catch (error: any) {
    throw new Error(generateErrMsg(error));
  }
};

export const useLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const observeAuth = () => {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user signed in! :)');
    } else {
      console.log('user not signed in :(');
      navigate('/auth');
    }
  });
};
