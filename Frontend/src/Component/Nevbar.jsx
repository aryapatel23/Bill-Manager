import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className='w-full flex items-center justify-between px-6 md:px-10 bg-white shadow-md'>
      {/* Logo */}
      <div className='flex items-center'>
        <img 
          src="https://res.cloudinary.com/dzsvjyg2c/image/upload/v1741258133/amxh4fnusn45rdqzqlco.png" 
          alt="Logo" 
          className='w-auto h-20 pt-2 pb-2' 
        />
      </div>

      {/* Mobile Menu Toggle Button */}
      <button 
        className='md:hidden text-gray-700' 
        onClick={toggleMenu}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links */}
      <div className={`md:flex items-center space-x-6 gap-6 
        ${isOpen ? "block" : "hidden"} 
        absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent 
        md:shadow-none shadow-lg md:p-0 p-4 px-6 md:px-10`}
      >
        <Link to="/" className="text-lg font-medium hover:underline block md:inline" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/bill" className="text-lg font-medium hover:underline block md:inline" onClick={closeMenu}>
          Bill
        </Link>
        <Link to="/billform" className="text-lg font-medium hover:underline block md:inline mt-2 md:mt-0" onClick={closeMenu}>
          Bill Form
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
