import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-between px-6 py-3'>
      {/* Logo */}
      <div className='flex items-center'>
        <img 
          src="https://res.cloudinary.com/dzsvjyg2c/image/upload/v1741258133/amxh4fnusn45rdqzqlco.png" 
          alt="Logo" 
          className='w-auto h-12' 
        />
      </div>

      {/* Navigation Links */}
      <div className='flex items-center'>
        <Link to="/bill" className="text-lg font-medium hover:underline">
          Bill
        </Link>
        <Link to="/billform" className="text-lg font-medium hover:underline">
          Bill From
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

