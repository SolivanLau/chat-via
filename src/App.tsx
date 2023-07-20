import Routing from './components/Routing';
import { observeAuth } from './firebase/authHooks';

function App() {
  observeAuth();
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
