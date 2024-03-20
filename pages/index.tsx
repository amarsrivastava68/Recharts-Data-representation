import fs from 'fs';
import path from 'path';
import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';



interface Heading {
  TableName: string;
  HeadingName: string;
}



const IndexPage = (props : {data:[]}) => {
  const [jsonData, setJsonData] = useState<[]>([]);
  const [heading, setHeading] = useState<Heading[]>( [
    { TableName: 'Identification', HeadingName: 'Identification Code' },
    { TableName: 'Latitude', HeadingName: 'Latitude' },
    { TableName: 'Longitude', HeadingName: 'Longitude' },
    { TableName: 'Time of Observation', HeadingName: 'Time of Observation' },
   
    { TableName: 'Sea Level Pressure', HeadingName: 'Sea Level Pressure' },
    { TableName: 'Characteristics of Pressure Tendency', HeadingName: 'Pressure Tendency Char.' },
    { TableName: 'Pressure Tendency', HeadingName: 'Pressure Tendency' },
    { TableName: 'Air Temperature', HeadingName: 'Air Temp.' }, 
  
    { TableName: 'Dew Point Temperature', HeadingName: 'Dew Point Temp.' }, 

  
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
    setJsonData(props.data);
  }, [props.data]);

  const indexOfLastRecord: number = currentPage * recordsPerPage;
  const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;
  const currentRecords: any[] = jsonData.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages: number = Math.ceil(jsonData.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div> 
   <div className="flex justify-center">
  <div className="mx-auto max-w-screen-lg">
    <LineChart
      width={800}
      height={300}
      data={jsonData}
      margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Longitude" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Air Temperature" name="Air Temperature" />
    </LineChart>
  </div>
</div>




      <div className="min-h-full  overflow-x-scroll md:mx-16 m-4  min-w-full ">
     
        <div >
          <div className="min-w-full w-max  border-t border-b rounded-2xl flex ">
            {heading.length > 0 &&
              heading.map((value: any, index: any) => (
                <div
                  className="text-black text-[12px] flex  items-center py-[14px]  px-3 text-left border-r bg-[#F7F7F7] font-medium w-[150px]"
                  key={index}
                >
                  {value.HeadingName}
                </div>
              ))}
          </div>
        </div>
        <div className="min-w-full ">
          {currentRecords.map((data: any, index: number) => (
            <div className="border-b flex w-max" key={index}>
              {heading.length > 0 &&
                heading.map((value: any, index: any) => (
                  <div
                    className="text-black text-[12px] text-left py-2 font-normal flex border-r px-3 items-center w-[150px]"
                    key={index}
                  >
                    {data[value.TableName]}
                  </div>
                ))}
            </div>
          ))}
        </div>
         
      </div>
      <div className="pagination-container flex items-center  justify-center  mt-2 mb-4">
          <span className="text-gray-600 text-sm mr-2">Page number:</span>
          <ul className="pagination flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
              <li key={page} className="page-item">
                <a
                  onClick={() => paginate(page)}
                  href="#!"
                  className={`page-link ${currentPage === page ? 'bg-blue-500 text-white' : 'text-blue-500'} py-2 px-4 rounded-lg`}
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

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'lib', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return {
    props: {
      data: jsonData,
    },
  };
}

export default IndexPage;