import React from 'react'
import Header from './header'
import fs from 'fs';
import path from 'path';
import MainPage from './Main'

const Index = ({ data } : {data : []}) => {
  return (
    <div>
      <Header />
      <MainPage data={data} />
    </div>
  )
}

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
