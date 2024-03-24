export type Seadata = {

    "Identification": string;
    "Latitude": number;
    "Longitude": number;
    "Time of Observation": string;
    "Sea Level Pressure": number;
    "Characteristics of Pressure Tendency": number;
    "Pressure Tendency": number;
    "Air Temperature": number;
    "Dew Point Temperature": number;
    "Wave Period": string;
    "Wave Height": number | null; 
    "Swell Direction": string; 
    "Swell Period": string;
    "Swell Height": number | null; 
    "Total Cloud Amount": number;
    "Low Cloud Amount": string; 
    "Cloud Height": number;
    "Middle Cloud Type": number | string; 
    "High Cloud Type": string | null | number; 
    "Visibility": number;
    "Present Weather": number;
    "Past Weather": number;
    "Wind Direction": number;
    "Wind Speed": number;
  
    [key: string]: string | number | null ;
  }

  export type Heading ={
 
        TableName: string;
        HeadingName: string;
        
        [key : string] : string ;   
  }