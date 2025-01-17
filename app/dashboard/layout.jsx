import React from "react";
import Slidebar from "./_component/slidebar";
import Header from "./_component/header";
import CreateButton from "./_component/CreateButton";

const Layoutdashboard = ({ children }) => {
  return (
    <div>
      <div className="hidden md:flex md:w-64">
        <Slidebar />
      </div>
      <div className="md:ml-64">
        <div className="flex justify-between items-center p-3 shadow-md md:justify-end">
          
          <div className="flex md:hidden">
            <CreateButton />
          </div>
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layoutdashboard;
