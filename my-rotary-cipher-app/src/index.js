// src/main.jsx (for Vite) or src/index.js (for Create React App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Or './index.css' if you named it that and it's global

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
