import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import See from '../pages/See';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/see/:id" element={<See />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
