
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Graph from './Graph';
interface Heading {
  TableName: string;
  HeadingName: string;
}

const MainPage = ({ data, theme }: { data: [], theme: string }) => {
  const [jsonData, setJsonData] = useState<[]>([]);
  const [heading, setHeading] = useState<Heading[]>( [
    { TableName: 'Identification', HeadingName: 'Identification' },
    { TableName: 'Latitude', HeadingName: 'Latitude' },
    { TableName: 'Longitude', HeadingName: 'Longitude' },
    { TableName: 'Time of Observation', HeadingName: 'Time of Observation' },
    { TableName: 'Sea Level Pressure', HeadingName: 'Sea Level Pressure' },
    { TableName: 'Characteristics of Pressure Tendency', HeadingName: 'Pressure Tendency Characteristics' },
    { TableName: 'Pressure Tendency', HeadingName: 'Pressure Tendency' },
    { TableName: 'Air Temperature', HeadingName: 'Air Temperature' }, 
    { TableName: 'Dew Point Temperature', HeadingName: 'Dew Point Temperature' }, 
    { TableName: 'Wave Period', HeadingName: 'Wave Period' },
    { TableName: 'Wave Height', HeadingName: 'Wave Height' },
    { TableName: 'Swell Direction', HeadingName: 'Swell Direction' },
    { TableName: 'Swell Period', HeadingName: 'Swell Period' },
    { TableName: 'Swell Height', HeadingName: 'Swell Height' },
    { TableName: 'Total Cloud Amount', HeadingName: 'Total Cloud Cover' },
    { TableName: 'Low Cloud Amount', HeadingName: 'Low Cloud Cover' }, 
    { TableName: 'Cloud Height', HeadingName: 'Cloud Height' },
    { TableName: 'Middle Cloud Type', HeadingName: 'Middle Cloud Type' },
    { TableName: 'High Cloud Type', HeadingName: 'High Cloud Type' },
    { TableName: 'Visibility', HeadingName: 'Visibility' },
    { TableName: 'Present Weather', HeadingName: 'Present Weather' },
    { TableName: 'Past Weather', HeadingName: 'Past Weather' },
    { TableName: 'Wind Direction', HeadingName: 'Wind Direction' },
    { TableName: 'Wind Speed', HeadingName: 'Wind Speed' },
  ]);



  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage: number = 15;

  useEffect(() => {
    setJsonData(data);
  }, [data]);

  const indexOfLastRecord: number = currentPage * recordsPerPage;
  const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;
  const currentRecords: any[] = jsonData?.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages: number = Math.ceil(jsonData?.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

 
  return (
    <div className={` ${theme === 'dark' ? 'bg-gray-800 text-gray' : 'bg-white text-black'}`}>
      <Graph jsonData={jsonData} theme={theme} />
    
      {/* Table */}
      <div className="min-h-full overflow-x-scroll md:mx-16">
        <div>
          <div className={`min-w-full w-max border-t border-b rounded-xl flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
            {heading.map((value: any, index: any) => (
              <div className=" text-[12px] flex items-center py-[14px] px-3 text-left  font-medium w-[150px]" key={index}>
                {value.HeadingName}
              </div>
            ))}
          </div>
        </div>
        <div className={`min-w-full ${theme === 'dark' ? 'text-white bg-gray-800' : 'bg-white'} `}>
          {currentRecords.map((data: any, index: number) => (
            <div className={`border-b flex w-max ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-xl`} key={index}>
              {heading.map((value: any, index: any) => (
                <div className="text-[12px] text-left py-2 font-normal flex border-r px-3 items-center w-[150px] rounded" key={index}>
                  {data[value.TableName]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-container flex items-center justify-center mt-8 p-4">
        <span className={` text-sm mr-4  ${theme === 'dark' ? ' text-white' : ' text-black'}`}>Page number:</span>
        <ul className="pagination flex">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
            <li key={page} className="page-item">
              <a
                onClick={() => paginate(page)}
               
                className={`page-link ${currentPage === page ? 'bg-blue-500 text-white' : 'text-blue-500'} py-2 px-4 rounded-lg cursor-pointer`}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
