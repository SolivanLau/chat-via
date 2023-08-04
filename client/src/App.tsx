import { FC, useEffect } from 'react';
// REACT ROUTER
import Routing from './components/Routing';
import { useNavigate } from 'react-router-dom';
// FB
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { getUserDBInfo } from './firebase/dbHooks';
import { setUserInfo } from './state/authSlice';
import { useAppDispatch } from './state/stateHooks';

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const checkUser = async (uid: string) => {
    const res = await getUserDBInfo(uid);
    dispatch(setUserInfo(res));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('user not signed in :(');
        navigate('/auth');
      } else {
        console.log('user signed in! :)');
        checkUser(user.uid);
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
};

export default App;
