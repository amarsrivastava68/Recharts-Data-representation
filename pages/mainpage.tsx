import { useEffect, useState } from "react";
import { format } from "date-fns";

import DatePicker from 'react-datepicker';
import moment, { Moment } from 'moment'
import Graph from "./components/Graph";
interface Heading {
  TableName: string;
  HeadingName: string;
}

const MainPage = ({ data, theme }: { data: any[]; theme: string }) => {
  const [jsonData, setJsonData] = useState<any>([]);

  
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [heading, setHeading] = useState<Heading[]>([
    { TableName: "Identification", HeadingName: "Identification" },
    { TableName: "Latitude", HeadingName: "Latitude" },
    { TableName: "Longitude", HeadingName: "Longitude" },
    { TableName: "Time of Observation", HeadingName: "Time of Observation" },
    { TableName: "Sea Level Pressure", HeadingName: "Sea Level Pressure" },
    { TableName: "Characteristics of Pressure Tendency",HeadingName: "Pressure Tendency Characteristics",},
    { TableName: "Pressure Tendency", HeadingName: "Pressure Tendency" },
    { TableName: "Air Temperature", HeadingName: "Air Temperature" },
    { TableName: "Dew Point Temperature",HeadingName: "Dew Point Temperature",  },
    { TableName: "Wave Period", HeadingName: "Wave Period" },
    { TableName: "Wave Height", HeadingName: "Wave Height" },
    { TableName: "Swell Direction", HeadingName: "Swell Direction" },
    { TableName: "Swell Period", HeadingName: "Swell Period" },
    { TableName: "Swell Height", HeadingName: "Swell Height" },
    { TableName: "Total Cloud Amount", HeadingName: "Total Cloud Cover" },
    { TableName: "Low Cloud Amount", HeadingName: "Low Cloud Cover" },
    { TableName: "Cloud Height", HeadingName: "Cloud Height" },
    { TableName: "Middle Cloud Type", HeadingName: "Middle Cloud Type" },
    { TableName: "High Cloud Type", HeadingName: "High Cloud Type" },
    { TableName: "Visibility", HeadingName: "Visibility" },
    { TableName: "Present Weather", HeadingName: "Present Weather" },
    { TableName: "Past Weather", HeadingName: "Past Weather" },
    { TableName: "Wind Direction", HeadingName: "Wind Direction" },
    { TableName: "Wind Speed", HeadingName: "Wind Speed" },
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage: number = 15;
  const [startDate, setStartDate] = useState<string >();
  const [endDate, setEndDate] = useState<string >();


    // Initialize filtered data with all records

    // Set min and max date
    

useEffect(() =>{

  const dates = jsonData.map((record: any) => record["Time of Observation"]);
  console.log(dates )
  const momentDates = dates.map(date => moment(date.toString() ));

// Find minimum and maximum values
const minDate = moment.min(momentDates);
const maxDate = moment.max(momentDates);


console.log("Minimum Date:", minDate.format());
console.log("Maximum Date:", maxDate.format());

setStartDate(minDate.format())
setEndDate(minDate.format())

} , [jsonData])
    const indexOfLastRecord: number = currentPage * recordsPerPage;
  const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;
  const currentRecords: any[] = jsonData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = jsonData.filter((record: any) => {
        const recordDate = new Date(record["Time of Observation"]).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return recordDate >= start && recordDate <= end;
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate ]);
  const totalPages: number = Math.ceil(jsonData?.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const handleApplyFilter = () => {
    // Update start and end dates and let useEffect handle filtering and rerendering
   
  };
console.log('theseare st and ed ' , startDate , endDate)

  useEffect(() => {
    
    setJsonData(data);
  }, [data]);

  return (
    <div className={` ${theme === "dark" ? " text-gray" : " text-black"}`}>

       {/* Date Range Selector */}
       // Inside the return statement of your MainPage component, after the Graph component

{/* Date Range Selector */}
<div className="flex items-center mt-4 mx-5">
  <label htmlFor="startDate" className="mr-2">Start Date:</label>
  <input
    type="date"
    id="startDate"
    min={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="border border-gray-300 rounded px-2 py-1 mr-4"
  />
  <label htmlFor="endDate" className="mr-2">End Date:</label>
  <input
    type="date"
    id="endDate"
    value={endDate || ''}
    onChange={(e) => setEndDate(e.target.value)}
    className="border border-gray-300 rounded px-2 py-1"
  />
  <button onClick={handleApplyFilter} className="bg-blue-500 text-white px-4 py-1 rounded ml-4">Apply</button>
</div>


      <Graph jsonData={jsonData} theme={theme} />

      {/* Table */}
      <div className="min-h-full overflow-x-scroll  md:mx-16 mt-4 mx-5">
        <div>
          <div
            className={`min-w-full w-max border-t border-b rounded-xl flex ${
              theme === "dark" ? " text-white" : "bg-gray-100 text-black"
            }`}
          >
            {heading.map((value: any, index: any) => (
              <div
                className="  text-[12px] flex items-center py-[14px] px-3 text-left  font-medium w-[150px]"
                key={index}
              >
                {value.HeadingName}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`min-w-full ${
            theme === "dark" ? "text-white " : "text-black"
          } `}
        >
          {currentRecords.map((data: any, index: number) => (
            <div
              className={`text-center border-b flex w-max  ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              } rounded-xl`}
              key={index}
            >
              {heading.map((value: any, index: any) => (
                <div
                  className="text-[12px] text-left py-2 font-normal   flex border-r px-3  w-[150px] rounded"
                  key={index}
                >
                  {data[value.TableName]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-container flex items-center justify-center mt-8 p-4">
        <span
          className={` text-sm mr-4  ${
            theme === "dark" ? " text-white" : " text-black"
          }`}
        >
          Page number:
        </span>
        <ul className="pagination flex">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page: number) => (
              <li key={page} className="page-item">
                <a
                  onClick={() => paginate(page)}
                  className={`page-link ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "text-blue-500"
                  } py-2 px-4 rounded-lg cursor-pointer`}
                >
                  {page}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
