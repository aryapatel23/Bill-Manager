import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Nevbar from './Component/Nevbar';
import Bill from './Component/Bill/Bill';
import BillList from './Component/BillList/BillList';
import Invoice from './Component/Billdetails/Billdetails'; // Import Invoice
import BillForm from './Component/BillForm/BillForm';

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
          {/* <Route path="/billlist" element={<BillList />} /> */}
          <Route path="/bill" element={<Bill />} />
          <Route path="/invoice/:billId" element={<Invoice />} /> 
          <Route path="/billform" element={<BillForm />} /> 
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
