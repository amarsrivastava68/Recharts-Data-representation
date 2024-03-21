import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = ({ jsonData, theme }: { jsonData: any[], theme: string }) => {
  const [xAxisDataKey, setXAxisDataKey] = useState<string>('Longitude');
  const [yAxisDataKey, setYAxisDataKey] = useState<string>('Air Temperature');

  // Options for X-axis and Y-axis keys
  const xAxisOptions = ['Latitude', 'Longitude', 'Time of Observation'];
  const yAxisOptions = [ 'Sea Level Pressure' , 'Wave Height' , 'Air Temperature', 'Dew Point Temperature', 'Cloud Height', 'Visibility', 'Wind Direction' ,];

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
      const xKey = payload[0].name;
      const xValue = payload[0].payload[yAxisDataKey];
      const yKey = xAxisDataKey;
      const yValue = payload[0].payload[xAxisDataKey];
      
      return (
        <div className="bg-white border border-gray-300 p-2 rounded-md shadow">
          <p className="font-semibold">{`${xKey}: ${xValue}`}</p>
          <p className="font-semibold">{`${yKey}: ${yValue}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex justify-between">
      {/* Left side: Y-axis key selection */}
      <div className="flex flex-col items-start mr-4 ml-5">
        <p className={`mb-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Select Y-axis Parameter:</p>
        {yAxisOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleYAxisChange(option)}
            className={`mb-2 py-2 px-4 rounded-lg text-base  transition duration-300 ease-in-out ${
              theme === 'dark'
                ? `text-white ${yAxisDataKey === option ? 'bg-blue-500' : 'bg-gray-900 hover:bg-gray-700'}`
                : `text-gray-800 ${yAxisDataKey === option ? 'bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'}`
            } focus:outline-none`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div className="flex justify-center flex-col items-center">
        {/* LineChart for small screens */}
        <div className="block sm:hidden mt-10 mr-4 mb-4">
          <div className="flex justify-center text-center">
            <LineChart width={360} height={200} data={jsonData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yAxisDataKey} />
            </LineChart>
          </div>
        </div>

        {/* LineChart for larger screens */}
        <div className="hidden sm:block max-w-screen-lg mb-4">
          <LineChart width={1000} height={400} data={jsonData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey={yAxisDataKey} name={yAxisDataKey} />
          </LineChart>
        </div>

        {/* Variation sentence */}
        <div className={`flex justify-center mb-4  ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <p>Variation of {yAxisDataKey} with respect to {xAxisDataKey}</p>
        </div>
      </div>

      {/* Right side: X-axis key selection */}
      <div className="flex flex-col items-end mr-5 ml-7">
        <p className={`mb-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Select X-axis Parameter:</p>
        {xAxisOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleXAxisChange(option)}
            className={`mb-2 py-2 px-4 rounded-lg text-base  transition duration-300 ease-in-out ${
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
  );
};

export default Graph;
