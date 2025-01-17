"use client";

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { userdatacontext } from './_context/userdataContext';
import { Videodetail } from './_context/playervideoContext';

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userdata, setuserdata] = useState([]);
  const [videoplaydetail, setvideoplaydetail] = useState([]);

  const userinfo = async () => {
    try {
      if (user) {
        const response = await fetch("http://localhost:3000/api/add-data", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
          }),
        });

        const result = await response.json();
        setuserdata(result?.data);
         
      }
    } catch (error) {
      console.error('Error sending user data:', error);
       
    }
  };

  useEffect(() => {
    if (user) {
      userinfo();
    }
  }, [user]);


  return (
    <userdatacontext.Provider value={{ userdata, setuserdata }}>
      <Videodetail.Provider value={{ videoplaydetail, setvideoplaydetail }}>
        {children}
      </Videodetail.Provider>
    </userdatacontext.Provider>
  );
};

export default Provider;
