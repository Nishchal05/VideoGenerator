import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
const Dropdown = ({label,defaultvalue,options,handleInputChange}) => {
  return (
    <div>
    <h2>{label}</h2>
    <Select onValueChange={(value)=>handleInputChange(value)}>
    <SelectTrigger className="w-[180px] bg-white">
      <SelectValue placeholder={defaultvalue} />
    </SelectTrigger>
    <SelectContent>
    {options.map((val,index)=>(<SelectItem key={index} value={val?.name??val}>{val?.name??val}</SelectItem>))}
    </SelectContent>
  </Select>
  </div>
  )
}

export default Dropdown