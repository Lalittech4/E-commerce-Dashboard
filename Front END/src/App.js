import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from "react";
import Nav from './components/nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import Productlist from './components/Productlist';
import Update from './components/Update';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Productlist />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/logout' element={<h1>logout component</h1>} />
          </Route>
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />

        </Routes>

      </BrowserRouter>

      <Footer />
    </div>

  )
}

export default App;
