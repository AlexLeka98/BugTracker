import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { TicketContextProvider } from './store/ticket-context';



ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <TicketContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </TicketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);