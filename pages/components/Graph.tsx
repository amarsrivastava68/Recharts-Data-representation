import React, { useState } from "react";
import { Seadata } from "../../lib/definitions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


const Graph = ({ jsonData, theme }: { jsonData: Seadata[]; theme: string }) => {
  const [xAxisDataKey, setXAxisDataKey] = useState<string>("Latitude");
  const [yAxisDataKey, setYAxisDataKey] = useState<string>("Air Temperature");

  const xAxisOptions = ["Latitude", "Longitude", "Time of Observation"];
  const yAxisOptions = [
    "Sea Level Pressure",
    "Air Temperature",
    "Wave Height",
    "Cloud Height",
    "Visibility",
    "Wind Direction",
    "Dew Point Temperature",
  ];

  // Function to handle change of X-axis key
  const handleXAxisChange = (option: string) => {
    setXAxisDataKey(option);
  };

  // Function to handle change of Y-axis key
  const handleYAxisChange = (option: string) => {
    setYAxisDataKey(option);
  };

  //Formatting date 
  function formatDate(dateString:string) {
    const date = new Date(dateString);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    const year = (date.getFullYear() + '').slice(2);
    const hours = (date.getHours() % 12 || 12);
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
   
    if (active && payload && payload.length) {
      let xKey = xAxisDataKey;
      let xValue = payload[0].payload[xAxisDataKey];
      let yKey = yAxisDataKey;
      let yValue = payload[0].payload[yAxisDataKey];

      if (xKey === 'Time of Observation') {
        xValue = formatDate(xValue);
      }
      if (xKey === 'Time of Observation') {
        xKey = 'Observation Time';
      }


      return (
        <div className="bg-white border border-gray-500 p-2 rounded-md shadow">
          <p className="font-semibold text-sm text-black">{`${yKey}: ${yValue}`}</p>
          <p className="font-semibold text-sm text-black">{`${xKey}: ${xValue}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex md:justify-between md:flex-row flex-col">
      {/* Graph */}
      <div className="flex justify-center flex-col items-center">
        {/* LineChart for small screens  */}
        <div className="block md:hidden md:mt-5  mr-11 mb-4 flex justify-center text-center">
          <LineChart
            width={400}
            height={200}
            data={jsonData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 10 }} /> {/* Customize X axis ticks */}
    <YAxis tick={{ fontSize: 12 }} /> {/* Customize Y axis ticks */}
    <Tooltip content={<CustomTooltip />} />

            <Line type="monotone" dataKey={yAxisDataKey} />
          </LineChart>
        </div>

        {/* LineChart for larger screens */}
        <div className="hidden md:block max-w-screen-lg mb-4">
          <LineChart
            width={1020}
            height={400}
            data={jsonData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 13}}/>
            <YAxis tick={{ fontSize: 13}} />
            <Tooltip content={<CustomTooltip />} />

            <Line type="monotone" dataKey={yAxisDataKey} name={yAxisDataKey} />
          </LineChart>
        </div>

        {/* Variation sentence */}
        <div
          className={`flex justify-center mb-4 md:ml-20 ml-5 mr-4 text-center text-sm  md:text-base  ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <p>
            Graph showing variation of{" "}
            <span className="font-semibold text-blue-500">{yAxisDataKey}</span>{" "}
            (y-axis) with respect to{" "}
            <span className="font-semibold text-blue-500"> {xAxisDataKey}</span>{" "}
            (x-axis)
          </p>
        </div>
      </div>

      {/*  Y-axis key selection for desktop*/}

      <div className="flex md:mr-5 md:gap-1 justify-center ">
        <div className="flex flex-col items-start  ">
          <p
            className={`mb-4 font-bold text-xs ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Y-axis Parameter
          </p>
          {yAxisOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleYAxisChange(option)}
              className={`mb-2 py-2 px-4 rounded-lg text-xs transition duration-300 ease-in-out ${
                theme === "dark"
                  ? `text-white  ${
                      yAxisDataKey === option
                        ? "bg-blue-500"
                        : "bg-gray-900 hover:bg-gray-700"
                    }`
                  : `text-gray-800 ${
                      yAxisDataKey === option
                        ? "bg-blue-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`
              } focus:outline-none`}
            >
              {option}
            </button>
          ))}
        </div>

        {/*  Y-axis key selection for desktop*/}

        <div className="flex flex-col items-end   ">
          <p
            className={`mb-4 font-bold text-xs ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            X-axis Parameter
          </p>
          {xAxisOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleXAxisChange(option)}
              className={`mb-2 py-2 px-4 rounded-lg text-xs  transition duration-300 ease-in-out ${
                theme === "dark"
                  ? `text-white ${
                      xAxisDataKey === option
                        ? "bg-green-500"
                        : "bg-gray-900 hover:bg-gray-700"
                    }`
                  : `text-gray-800 ${
                      xAxisDataKey === option
                        ? "bg-green-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`
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
