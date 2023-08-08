import { auth, db } from './firebase';
import { ref, set } from 'firebase/database';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/stateHooks';
import { UserInfo, setUserInfo } from '../state/authSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';

// ERROR MESSAGE HANDLER
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

// GENERATE ERROR HOOK
const generateErrMsg = (err: any) => {
  const errCode = err.code;

  const errObj = errorMsgArr.find((obj) => obj.code === errCode);
  return errObj ? errObj.message : 'Unexpected error... Please try again later';
};

// SIGN UP HOOK
export const useSignUp = async (
  userName: string,
  email: string,
  password: string
) => {
  try {
    // Step 1: Create user with email and password
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Step 2: Update user's display name
    await updateProfile(userCredentials.user, {
      displayName: userName,
    });
  } catch (error: any) {
    throw new Error(generateErrMsg(error));
  }
};

// SIGN IN HOOK
export const useSignIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(generateErrMsg(error));
  }
};
// LOG OUT
export const useLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

const getToken = async (user: User) => {
  try {
    const token: string = await getIdToken(user);
    return token;
  } catch (error) {
    console.log(error);
  }
};

// AUTH OBSERVER
export const useObserveAuth = () => {
  // AUTH INSTANCE
  const auth = getAuth();
  // REDUX DISPATCH
  const dispatch = useAppDispatch();
  // REDUX AUTHSTATE
  const authState: UserInfo = useAppSelector((state) => state.auth);
  // LOAD STATE:
  const [isLoading, setIsLoading] = useState<boolean>(!auth.currentUser);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user: User | null) => {
      // IF AUTH IS NOT NULL, UDPATE STATE VIA REDUX
      if (user) {
        const { uid, displayName, email } = user;
        const token = await user.getIdToken();
        const userObj = {
          uid: uid,
          name: displayName,
          email: email,
          token: token,
        };
        dispatch(setUserInfo(userObj));
        console.log(token);
      }

      setIsLoading(false);
    });
  }, [authState]);

  return { isLoading };
};

// TOKEN REQUEST
// DB CREATE USER
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
