import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import MsgPage from '../pages/MsgPage';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<MsgPage />} />
      </Routes>
    </>
  );
};

export default Routing;
