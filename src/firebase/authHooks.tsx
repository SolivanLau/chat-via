import { auth, db } from './firebase';
import { ref, set } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/stateHooks';

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

export const useCreateUser = async (
  name: string,
  email: string,
  uid: string
) => {
  try {
    // Create a new unique key for the user
    const userRef = ref(db, `/users/${uid}`);
    const newUser = {
      email,
      name,
    };

    // Set the user object at the newly created key
    set(userRef, newUser);
    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
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
    const { uid } = userCred.user;

    await useCreateUser(userName, email, uid);
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
