import React from 'react';



const Header  = ({onThemeChange , theme}: {onThemeChange : ()=>void ,  theme:string}) => {
  return (
    <div>
    <div className="bg-gray-700 h-16 flex items-center justify-between px-4 mb-4">
      <div className="logo">
        {/* Your logo image */}
        <img src="logo.png" alt="Logo" className="h-10" />
      </div>
      <p className='text-white font-bold'>Marinal Analysis</p>
      <div >
        <button onClick={onThemeChange} className={`  py-2 px-4 rounded  ${theme === 'dark' ? 'bg-blue-500 text-white ':'bg-gray-300 text-black'} `}>
        {theme === 'dark' ? 'Light':'Dark '} 
        </button>
      </div>
    </div>
    </div>
  );
};

export default Header;
