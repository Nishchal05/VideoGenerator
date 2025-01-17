import React from 'react'
import { Slider } from "@/components/ui/slider"

const Sliderbar = ({label,value,handleInputChange,max=100,step=1}) => {
  return (
    <div>
    <label>{label}</label>
    <Slider defaultValue={[value]} max={max} step={step} onValueChange={(value)=>handleInputChange(value[0])}/>
    </div>
  )
}

export default Sliderbar