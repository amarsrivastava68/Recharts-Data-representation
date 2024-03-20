import React from 'react';

interface HeaderProps {
  onThemeChange: () => void;
  theme : string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between px-4">
      <div className="logo">
        {/* Your logo image */}
        <img src="logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="theme-button">
        <button onClick={props.onThemeChange} className={`text-white font-bold py-2 px-4 rounded  ${props.theme === 'dark' ? 'bg-blue-500':'bg-gray-600'} `}>
        {props.theme === 'dark' ? 'Light Mode':'Dark Mode'} 
        </button>
      </div>
    </div>
  );
};

export default Header;
