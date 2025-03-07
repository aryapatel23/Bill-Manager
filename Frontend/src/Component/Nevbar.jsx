import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full flex items-center justify-between px-6 md:px-10'>
      {/* Logo */}
      <div className='flex items-center'>
        <img 
          src="https://res.cloudinary.com/dzsvjyg2c/image/upload/v1741258133/amxh4fnusn45rdqzqlco.png" 
          alt="Logo" 
          className='w-auto h-12' 
        />
      </div>

      {/* Mobile Menu Toggle Button */}
      <button 
        className='md:hidden text-gray-700' 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links */}
      <div className={`md:flex items-center space-x-6 gap-6 ${isOpen ? "block" : "hidden"} 
          absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent 
          md:shadow-none shadow-lg md:p-0 p-4 px-6 md:px-10`}>
        <Link to="/bill" className="text-lg font-medium hover:underline block md:inline">
          Bill
        </Link>
        <Link to="/billform" className="text-lg font-medium hover:underline block md:inline mt-2 md:mt-0">
          Bill Form
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
