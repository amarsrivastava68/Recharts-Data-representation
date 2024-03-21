import React, { useState } from 'react';
import Header from './header';
import fs from 'fs';
import path from 'path';
import MainPage from './Main';
import '@fortawesome/fontawesome-svg-core/styles.css';


const Index = ({ data }: { data: [] }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <Header onThemeChange={handleThemeChange} theme={theme} />
      <MainPage data={data} theme={theme} />
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'lib', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return {
    props: {
      data: jsonData,
    },
  };
}

export default Index;
