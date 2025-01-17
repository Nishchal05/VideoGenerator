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
        <Header/>
        <div className=' p-10 md:px-24 lg:px-24 flex flex-col gap-6'>
        <div className=' flex justify-between text-center'>
        <h2 className=' font-bold text-2xl'>Edit Video</h2>
        <div className=' flex gap-1'><SaveVideo/>
        <Button>Export</Button></div>
        </div>
        <div  className=' grid grid-cols-6 gap-2'>
            <div>
            <TrackList/>
            </div>
            <div className=' col-span-3'>
               <VideoPlayer/>
            </div>
            <div className=' col-span-2'>
                <ControlSection/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Editor