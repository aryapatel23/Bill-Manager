import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Nevbar from './Component/Nevbar';
import Bill from './Component/Bill/Bill';
import BillList from './Component/BillList/BillList';
// import Invoice from './Component/Billdetails/Billdetails'; 
import BillForm from './Component/BillForm/BillForm';
import Home from './Component/Home/Home';
import BrowseProducts from './Component/Home/BrowseProducts/BrowseProducts';
import ContactUs from './Component/ContectUs/ContactUs'
import MaizeCornThresher from './Component/Home/ProductDetail/MaizeCornThresher/MaizeCornThresher';
import SamratCastorThresher from './Component/Home/ProductDetail/SamratCastorThresher/SamratCastorThresher';
import SamratMultiGrainThresher from './Component/Home/ProductDetail/SamratMultiGrainThresher/SamratMultiGrainThresher';
import SamratGrainThresher from './Component/Home/ProductDetail/SamratGrainThresher/SamratGrainThresher';
import SamratGroundNutDigger from './Component/Home/ProductDetail/SamratGroundNutDigger/SamratGroundNutDigger';

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
          <Route path="/browseproducts/maize-corn-thresher" element={<MaizeCornThresher />} />
          <Route path="/browseproducts/samrat-castor-thresher" element={<SamratCastorThresher />} />
          <Route path="/browseproducts/samrat-multi-grain-thresher" element={<SamratMultiGrainThresher />} />
          <Route path="/browseproducts/samrat-grain-thresher" element={<SamratGrainThresher />} />
          <Route path="/browseproducts/samrat-ground-nut-digger" element={<SamratGroundNutDigger />} />
          <Route path="/bill" element={<Bill />} />
          {/* <Route path="/invoice/:billId" element={<Invoice />} />  */}
          <Route path="/billform" element={<BillForm />} />
          <Route path='/contactus' element={<ContactUs />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
