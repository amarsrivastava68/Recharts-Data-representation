import fs from 'fs';
import path from 'path';
import { useEffect, useState } from 'react';




interface Heading {
  TableName: string;
  HeadingName: string;
}



const IndexPage = (props : {data:[]}) => {
  const [jsonData, setJsonData] = useState<[]>([]);
  const [heading, setHeading] = useState<Heading[]>( [
    { TableName: 'Identification', HeadingName: 'Identification' },
    { TableName: 'Latitude', HeadingName: 'Latitude' },
    { TableName: 'Longitude', HeadingName: 'Longitude' },
    { TableName: 'Time of Observation', HeadingName: 'Time of Observation' },
    { TableName: 'Ice Accretion On Ship', HeadingName: 'Ice Accretion' }, 
    { TableName: 'Thickness of Ice Accretion On Ship', HeadingName: 'Ice Thickness' }, 
    { TableName: 'Rate of Ice Accretion on Ship', HeadingName: 'Ice Accumulation Rate' },
    { TableName: 'Sea Level Pressure', HeadingName: 'Sea Level Pressure' },
    { TableName: 'Characteristics of Pressure Tendency', HeadingName: 'Pressure Tendency Char.' },
    { TableName: 'Pressure Tendency', HeadingName: 'Pressure Tendency' },
    { TableName: 'Air Temperature', HeadingName: 'Air Temp.' }, 
    { TableName: 'Wet Bulb Temperature', HeadingName: 'Wet Bulb Temp.' }, 
    { TableName: 'Dew Point Temperature', HeadingName: 'Dew Point Temp.' }, 
    { TableName: 'Sea Surface Temperature', HeadingName: 'Sea Surface Temp.' }, 
    { TableName: 'Wave Direction', HeadingName: 'Wave Direction' },
    { TableName: 'Wave Period', HeadingName: 'Wave Period' },
    { TableName: 'Wave Height', HeadingName: 'Wave Height' },
    { TableName: 'Swell Direction', HeadingName: 'Swell Direction' },
    { TableName: 'Swell Period', HeadingName: 'Swell Period' },
    { TableName: 'Swell Height', HeadingName: 'Swell Height' },
    { TableName: 'Total Cloud Amount', HeadingName: 'Total Cloud Cover' }, // More descriptive name
    { TableName: 'Low Cloud Amount', HeadingName: 'Low Cloud Cover' }, // More descriptive name
    { TableName: 'Low Cloud Type', HeadingName: 'Low Cloud Type' },
    { TableName: 'Cloud Height Indicator', HeadingName: 'Cloud Height Ind.' }, // Abbreviated for brevity
    { TableName: 'Cloud Height', HeadingName: 'Cloud Height' },
    { TableName: 'Middle Cloud Type', HeadingName: 'Middle Cloud Type' },
    { TableName: 'High Cloud Type', HeadingName: 'High Cloud Type' },
    { TableName: 'Visibility', HeadingName: 'Visibility' },
    { TableName: 'Visibility Indicator', HeadingName: 'Visibility Ind.' }, // Abbreviated for brevity
    { TableName: 'Present Weather', HeadingName: 'Present Weather' },
    { TableName: 'Past Weather', HeadingName: 'Past Weather' },
    { TableName: 'Wind Direction', HeadingName: 'Wind Direction' },
    { TableName: 'Wind Speed', HeadingName: 'Wind Speed' },
  ]);

  useEffect(() => {
    setJsonData(props.data);
    
  }, [props.data]);
  console.log(heading)
  return (
    <div>
      <div className="min-h-full border-x overflow-x-scroll">
          <div className="min-w-full ">
            <div className="min-w-full w-max border-t border-b flex  ">
              {heading.length > 0 &&
                heading.map((value: any, index: any) => (
                  <div
                    className=
                    " text-black text-[12px] flex  items-center py-[14px]  px-3 text-left border-r bg-[#F7F7F7] font-medium w-[150px]"
                    key={index}
                  >
                    {value.HeadingName}
                  </div>
                ))}
            </div>
          </div>
          <div className="min-w-full min-h-[518px]">
            {jsonData?.length > 0 &&
             jsonData?.map((data: any) => (
                <div className="border-b flex w-max">
                  {heading.length > 0 &&
                    heading.map((value: any, index: any) => (
                      <div
                        className={"text-black text-[12px] text-left py-2 font-normal flex border-r px-3 items-center w-[150px]"}
                        key={index}
                      >
                        {data[value.TableName]}
                      </div>
                    ))}
                </div>
              ))}
          </div>
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
