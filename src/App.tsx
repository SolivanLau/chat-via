import { FC, useEffect } from 'react';
// REACT ROUTER
import Routing from './components/Routing';
import { useNavigate } from 'react-router-dom';
// FB
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

const App: FC = () => {
  const navigate = useNavigate();

  const authObserve = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('user not signed in :(');
        navigate('/auth');
      } else {
        console.log('user signed in! :)');
        // setUserProfile(user);
      }
    });
  };

  // const setUserProfile = (user: any) => {
  //   const userProfile = getUserDBInfo(user.uid);
  //   dispatch(setUserInfo(userProfile));
  // };

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
