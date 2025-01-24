import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Home } from './pages/home';

const App = () => (
  <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        draggable
      />
    <Home />
  </>
);

export default App;