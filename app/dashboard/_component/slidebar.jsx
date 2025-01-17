"use client";
import React, { useContext } from "react";
import { Progress } from "@/components/ui/progress";
import { userdatacontext } from "@/app/_context/userdataContext";
import { usePathname, useRouter } from "next/navigation";
import CreateButton from "./CreateButton";
const Slidebar = () => {
  const component = [
    {
      name: "Dashboard",
      Logopath: "/dashboard.png",
      path: "/dashboard",
    },
    {
      name: "Buy Credits",
      Logopath: "/butCredit.png",
      path: "/BuyCredits",
    },
    {
      name: "Profile",
      Logopath: "/profile.png",
      path: "/Profile",
    },
  ];
  const { userdata, setuserdata } = useContext(userdatacontext);
  const path = usePathname();
  const router=useRouter();
  return (
    <div className="w-64 fixed h-screen shadow-md p-3">
      <div className="flex gap-1 items-center cursor-pointer" onClick={()=>{
        router.push('/dashboard')
      }}>
        <img
          src="/VideoGeneratorLogo.png"
          alt="Video Generator Logo"
          width={56}
        />
        <h2 className="font-medium text-lg">Video Generator</h2>
      </div>
      <ul className="flex flex-col gap-2">
      <li>
        <CreateButton/>
      </li>
        {component.map((val, index) => (
          <li
            key={index}
            className={`flex items-center bg-slate-50 text-gray-400 hover:bg-slate-500 border-r-4 rounded-lg ${
              path === val.path ? "!bg-blue-500 !text-black" : ""
            }`}
          >
            <img src={val.Logopath} alt="name" width={35} />
            {val.name}
          </li>
        ))}
      </ul>
      <div className="border text-sm font-bold absolute bottom-10 w-[85%] p-2">
        <h2 className="text-sm font-bold">Total Usage</h2>
        <Progress value={userdata[0]?.credits} />
        <h2 className="text-xs text-gray-600 ">
          {userdata[0]?.credits / 10 || 0} Min used out of 10 Min
        </h2>
      </div>
    </div>
  );
};

export default Slidebar;
