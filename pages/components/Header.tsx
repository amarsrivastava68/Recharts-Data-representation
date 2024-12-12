import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onThemeChange, theme }: { onThemeChange: () => void; theme: string }) => {
  return (
    <div>
      <div className="bg-gray-700 h-16 flex items-center justify-between px-4 mb-4">
        <div className="logo">
          
          {  /* <img src="logo.png" alt="Logo" className="h-10" /> */}
        </div>
        <p className="text-white font-bold">Marinal Analysis</p>
        <div>
          <button
            onClick={onThemeChange}
            className={`py-1 px-3 rounded ${
              theme === 'dark' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            {theme === 'dark' ? <FontAwesomeIcon icon={faLightbulb} /> : <FontAwesomeIcon icon={faMoon} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
