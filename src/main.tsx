import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/styles.css';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* redux state */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
