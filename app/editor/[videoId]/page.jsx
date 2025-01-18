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
        <div className='flex flex-col md:flex-row justify-between text-center gap-4'>
          <h2 className='font-bold text-xl md:text-2xl'>Edit Video</h2>
          <div className='flex gap-2 justify-center'>
            <SaveVideo />
            <Button>Export</Button>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
          {/* Track List */}
          <div className='md:col-span-1 lg:col-span-1'>
            <TrackList />
          </div>

          {/* Video Player */}
          <div className='md:col-span-3 lg:col-span-3'>
            <VideoPlayer />
          </div>

          {/* Control Section */}
          <div className='md:col-span-2 lg:col-span-2'>
            <ControlSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
