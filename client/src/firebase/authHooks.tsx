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
import { authRequest } from '../axios';
import { GroupedContacts, UserData } from '../tabs/ContactsTab';

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
    // Make the POST request to create a user
    const response = await authRequest.post('/users', {
      userName,
      email,
      password,
    });

    if (response) {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (error) {
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

export const useGetUsers = (token: string | null, uid: string | null) => {
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [contactData, setContactData] = useState<GroupedContacts>({});

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        authRequest.defaults.headers['Authorization'] = `Bearer ${token}`;
        try {
          const { data } = await authRequest.get('/users');
          if (data) {
            const dataArray = data.details.filter(
              (contact: UserData) => contact.uid !== uid
            );

            const groupContacts: GroupedContacts = dataArray
              .sort((a: UserData, b: UserData) =>
                a.userName.localeCompare(b.userName)
              )
              .reduce((acc: any, contact: UserData) => {
                const firstLetter = contact.userName.charAt(0).toUpperCase();

                // if first letter is NOT already in acc {}
                if (!acc[firstLetter]) {
                  // create a new key with firstLetter and array with contact info
                  acc[firstLetter] = [contact];
                } else {
                  // push contact into pre-existing firstLetter array
                  acc[firstLetter].push(contact);
                }
                return acc;
              }, {} as { [key: string]: UserData[] });
            setContactData(groupContacts);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoadingContacts(false);
        }
      }
    };

    fetchUsers();
  }, [token]);

  return { isLoadingContacts, contactData };
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
      }
      setIsLoading(false);
    });
  }, [authState]);

  return { isLoading };
};
