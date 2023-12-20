import React, { createContext, useState } from 'react';
export const MyServerContext = createContext();



const base_url = 'http://b48.deepijatel.in/convoxmeet/api';  //https://convoxmeet.deepijatel.in/convoxmeet/api //https://b48.deepijatel.in/convoxmeet/api/
  export const Servercontexts = ({children}) => {
   const [baseurl , setBaseurl] = useState(base_url);
//    const [customerurl , setConstumerurl] = useState(base_url);
    return (
      <MyServerContext.Provider
        value={{
          baseurl,
          setBaseurl,
        }}
      >
        {children}
      </MyServerContext.Provider>
    );
  };
  