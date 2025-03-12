import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Nevbar from './Component/Nevbar';
import Bill from './Component/Bill/Bill';
import BillList from './Component/BillList/BillList';
import Invoice from './Component/Billdetails/Billdetails'; // Import Invoice
import BillForm from './Component/BillForm/BillForm';
import Home from './Component/Home/Home';
import BrowseProducts from './Component/Home/BrowseProducts/BrowseProducts';
import ProductDetail from './Component/Home/ProductDetail/ProductDetail';

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar for Invoice Page
  const hideNavbar = location.pathname.includes('/invoice/');

  return (
    <div>
      {!hideNavbar && <Nevbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browseproducts" element={<BrowseProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/invoice/:billId" element={<Invoice />} /> 
          <Route path="/billform" element={<BillForm />} /> 
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
