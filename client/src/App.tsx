import { FC } from 'react';
// REACT ROUTER
// FB

import { AppRouter } from './components/Routing';
import { useObserveAuth } from './firebase/authHooks';

const App: FC = () => {
  // observes auth state and saves to redux state

  const { isLoading } = useObserveAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
