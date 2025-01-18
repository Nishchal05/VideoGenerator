import React from 'react'
import Header from '../../dashboard/_component/header'
import { Button } from '@/components/ui/button'
import TrackList from '../_components/TrackList'
import VideoPlayer from '../_components/VideoPlayer'
import ControlSection from '../_components/ControlSection'
import SaveVideo from '../_components/SaveVideo'

const Editor = () => {
  return (
    <div>
      <Header />
      <div className='p-4 md:p-10 lg:px-24 flex flex-col gap-6'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between text-center gap-4'>
          <h2 className='font-bold text-xl md:text-2xl'>Edit Video</h2>
          <div className='flex gap-2 justify-center'>
            <SaveVideo />
            <Button>Export</Button>
          </div>
        </div>
        
        {/* Main Content Section */}
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='flex flex-col md:flex-row md:w-4/6 gap-4'>
            <TrackList className='md:w-1/3' />
            <VideoPlayer className='md:w-2/3' />
          </div>

          {/* Control Section below for small screens, beside for medium and large screens */}
          <div className='md:w-2/6'>
            <ControlSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
