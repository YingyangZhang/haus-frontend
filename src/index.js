import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

setInterval(function() {
  fetch('/https://haus-backend-hde3.onrender.com/furnitures')
    .then(function(response) {
      console.log('Keep-alive request sent');
    })
    .catch(function(error) {
      console.error('Error sending keep-alive request:', error);
    });
}, 5000);
    
root.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>
);

