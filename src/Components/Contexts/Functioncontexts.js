import React, { createContext, useState, useEffect } from 'react';

export const MyFunctionContext = createContext();

export const Functioncontexts = ({ children, baseurl, groupId, userMobile, userId }) => {
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const baseurl = `https://b48.deepijatel.in/convoxmeet/api`;  //client
        const url = `${baseurl}/livecalldata?groupid=${groupId}&mobile=${userMobile}&uid=${userId}`;
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = await JSON.parse(JSON.stringify(usersjson));
        const mess = jsonres.messages;
        const jsondata = mess.data;
        setLiveData(jsondata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLiveData();
  }, [ groupId, userMobile, userId]);

  return (
    <MyFunctionContext.Provider
      value={{
        liveData,
      }}
    >
      {children}
    </MyFunctionContext.Provider>
  );
};
