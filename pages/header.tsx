import React from 'react';

const Header = ({ onThemeChange }) => {
  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between px-4">
      <div className="logo">
        {/* Your logo image */}
        <img src="logo.jpeg" alt="Logo" className="h-10" />
      </div>
      <div className="theme-button">
        <button onClick={onThemeChange} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Change Theme
        </button>
      </div>
    </div>
  );
};

export default Header;
