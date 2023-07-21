import { FC, useEffect } from 'react';
// REACT ROUTER
import Routing from './components/Routing';
import { useNavigate } from 'react-router-dom';
// FB
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { useAppDispatch } from './state/stateHooks';
import { getUserDBInfo } from './firebase/dbHooks';
import { setUserInfo } from './state/authSlice';

const App: FC = () => {
  // observeAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authObserve = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user signed in! :)');
        setUserProfile(user);
      } else {
        console.log('user not signed in :(');
        navigate('/auth');
      }
    });
  };

  const setUserProfile = async (user: any) => {
    const userProfile = await getUserDBInfo(user.uid);
    dispatch(setUserInfo(userProfile));
  };

  useEffect(() => {
    authObserve();
  }, []);

  return (
    <>
      <Routing />
    </>
  );
};

export default App;
