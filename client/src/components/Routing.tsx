import {
  Route,
  Routes,
  RedirectFunction,
  Navigate,
  Outlet,
} from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import MsgPage from '../pages/MsgPage';
import { FC, ReactNode } from 'react';
import { useAppSelector } from '../state/stateHooks';
import NotFoundPage from '../pages/NotFoundPage';

const PrivateRoutes: FC = () => {
  const user = useAppSelector((state) => state.auth);
  console.log(user);

  if (user.uid) {
    return <Outlet />;
  }

  return <Navigate to="/auth" />;
};

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MsgPage />}>
            {/* <Route path="/profile" element={} />
            <Route path="/profile" element={} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};
