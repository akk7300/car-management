import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Home } from './pages/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
};

export default App;