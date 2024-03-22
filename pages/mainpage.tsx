import { useEffect, useState } from "react";

import Graph from "./components/Graph";

interface Heading {
  TableName: string;
  HeadingName: string;
}

const MainPage = ({ data, theme }: { data: any[]; theme: string }) => {
  const [jsonData, setJsonData] = useState<any>([]);

  const [filteredData, setFilteredData] = useState<any[]>(jsonData);

  const [heading, setHeading] = useState<Heading[]>([
    { TableName: "Identification", HeadingName: "Identification" },
    { TableName: "Latitude", HeadingName: "Latitude" },
    { TableName: "Longitude", HeadingName: "Longitude" },
    { TableName: "Time of Observation", HeadingName: "Time of Observation" },
    { TableName: "Sea Level Pressure", HeadingName: "Sea Level Pressure" },
    {
      TableName: "Characteristics of Pressure Tendency",
      HeadingName: "Pressure Tendency Characteristics",
    },
    { TableName: "Pressure Tendency", HeadingName: "Pressure Tendency" },
    { TableName: "Air Temperature", HeadingName: "Air Temperature" },
    {
      TableName: "Dew Point Temperature",
      HeadingName: "Dew Point Temperature",
    },
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
  const [startDate, setStartDate] = useState<string>("2015-01-01");
  const [endDate, setEndDate] = useState<string>("2015-01-31");

  const indexOfLastRecord: number = currentPage * recordsPerPage;
  const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;
  const currentRecords: any[] = filteredData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages: number = Math.ceil(filteredData?.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleApplyFilter = () => {
    let applied = [];
    
   

    // Filter data based on the selected date range

    const appliedfilterdata = jsonData.filter((entry: any) => {
      const newvar = entry["Time of Observation"];
      const sd = new Date(startDate);
      const ed = new Date(endDate);
     
      if (sd <= new Date(newvar) && ed >= new Date(newvar)) {
        return true;
      }
    });
    if (appliedfilterdata.length ===0 )
    {
    alert('No Data available between these dates ')
    }

    setFilteredData(appliedfilterdata);
  };

  useEffect(() => {
    setJsonData(data);
    setFilteredData(data);
  }, [data]);

  return (
    <div className={` ${theme === "dark" ? " text-gray" : " text-black"}`}>
      
      {/* Date Range Selector */}
      <div className="flex items-center mt-4 mx-5 md:ml-80 text-xs mb-2">
        <label htmlFor="startDate" className="mr-2">
          From:
        </label>
        <input
          type="date"
          id="startDate"
          max="2015-01-31"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-4"
        />
        <label htmlFor="endDate" className="mr-2">
          To:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          min="2015-01-01"
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 text-white px-4 py-1 rounded ml-4"
        >
          Filter
        </button>
      </div>
      <Graph jsonData={filteredData} theme={theme} />
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
