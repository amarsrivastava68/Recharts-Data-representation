import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = ({ jsonData, theme }: { jsonData: any[], theme: string }) => {
  const [xAxisDataKey, setXAxisDataKey] = useState<string>('Latitude');
  const [yAxisDataKey, setYAxisDataKey] = useState<string>('Air Temperature');

  // Options for X-axis and Y-axis keys
  const xAxisOptions = ['Latitude', 'Longitude', 'Time of Observation'];
  const yAxisOptions = [ 'Sea Level Pressure' , 'Air Temperature','Wave Height' ,  'Cloud Height', 'Visibility', 'Wind Direction' , 'Dew Point Temperature'];

  // Function to handle change of X-axis key
  const handleXAxisChange = (option: string) => {
    setXAxisDataKey(option);
  };

  // Function to handle change of Y-axis key
  const handleYAxisChange = (option: string) => {
    setYAxisDataKey(option);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
    console.log(payload)
    if (active && payload && payload.length) {
      const xKey = xAxisDataKey;
      const xValue = payload[0].payload[xAxisDataKey];
      const yKey = yAxisDataKey;
      const yValue = payload[0].payload[yAxisDataKey];
      
      return (
        <div className="bg-white border border-gray-500 p-2 rounded-md shadow">
          
          <p className="font-semibold text-black">{`${yKey}: ${yValue}`}</p>
          <p className="font-semibold text-black">{`${xKey}: ${xValue}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex md:justify-between md:flex-row flex-col">
      {/* Left side: Y-axis key selection for desktop */}
      

      {/* Graph */}
      <div className="flex justify-center flex-col items-center">
        {/* LineChart for small screens  */}
        <div className="block md:hidden md:mt-5  mr-11 mb-4">
          <div className="flex justify-center text-center">
            <LineChart width={400} height={200} data={jsonData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              
              <Line type="monotone" dataKey={yAxisDataKey} />
            </LineChart>
          </div>
        </div>


        {/* LineChart for larger screens */}
        <div className="hidden md:block max-w-screen-lg mb-4">
          <LineChart width={1020} height={400} data={jsonData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            
            <Line type="monotone" dataKey={yAxisDataKey} name={yAxisDataKey} />
          </LineChart>
        </div>


        {/* Variation sentence */}
        <div className={`flex justify-center mb-4 md:ml-20 ml-5 mr-4 text-center text-sm  md:text-base  ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <p>Graph showing variation of <span className='font-semibold text-blue-500'>{yAxisDataKey}</span> (y-axis) with respect to <span className='font-semibold text-blue-500'> {xAxisDataKey}</span> (x-axis)</p>
        </div>
      </div>

      {/* Right side: X-axis key selection for desktop*/}
    <div className='flex md:mr-5 md:gap-1 justify-center '>
      <div className="flex flex-col items-start  ">
        <p className={`mb-4 font-bold text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}> Y-axis Parameter:</p>
        {yAxisOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleYAxisChange(option)}
            className={`mb-2 py-2 px-4 rounded-lg text-xs transition duration-300 ease-in-out ${
              theme === 'dark'
                ? `text-white  ${yAxisDataKey === option ? 'bg-blue-500' : 'bg-gray-900 hover:bg-gray-700'}`
                : `text-gray-800 ${yAxisDataKey === option ? 'bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'}`
            } focus:outline-none`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-end   ">
        <p className={`mb-4 font-bold text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}> X-axis Parameter:</p>
        {xAxisOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleXAxisChange(option)}
            className={`mb-2 py-2 px-4 rounded-lg text-xs  transition duration-300 ease-in-out ${
              theme === 'dark'
                ? `text-white ${xAxisDataKey === option ? 'bg-green-500' : 'bg-gray-900 hover:bg-gray-700'}`
                : `text-gray-800 ${xAxisDataKey === option ? 'bg-green-300' : 'bg-gray-200 hover:bg-gray-300'}`
            } focus:outline-none`}
          >
            {option}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Graph;
