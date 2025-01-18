"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_component/header'
import { Textarea } from '@/components/ui/textarea'
import Dropdown from '../editor/_components/Dropdown'
import { Button } from '@/components/ui/button'
import { v4 as uuid4 } from 'uuid'  
import { useUser } from '@clerk/nextjs'
import { Prompt } from '../_data/Prompt'
import { useRouter } from 'next/navigation'
import SpinnerLoader from '@/components/loader'
import { Loader2 } from 'lucide-react'

const CreateVideoGen = () => {
    const durationOption = Array.from({ length: 10 }, (_, index) => (index) * 5) 
    const [Topic, setTopic] = useState();
    const [duration, setDuration] = useState();
    const [loading,setloading]=useState(false);
    const { user } = useUser(); 
const router=useRouter();
    const handleGeneration = async () => {
        setloading(true);
        const videoId = uuid4();
        

        const response = await fetch('/api/addVideoData', {
            method: 'POST',
            body: JSON.stringify({
                videoId: videoId,
                useremail: user?.primaryEmailAddress?.emailAddress
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        console.log(result.data);

        const sampleData = Prompt.replace('{userTopic}', Topic).replace('{userDuration}', duration);

        const aiResult = await fetch('/api/create-ai-content', {
            method: 'POST',
            body: JSON.stringify({
                videoId: videoId,
                prompt: sampleData,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const aiResultData = await aiResult.json(); 
        console.log(aiResultData);
        setloading(false);
        router.push('/dashboard')
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col items-center justify-center px-10 md:px-32 lg:px-48 mt-24'>
                <h2 className='font-bold text-3xl'>Generate Video Content</h2>
                <div className='w-full max-w-xl mt-7'>
                    <label>Topic:</label>
                    <Textarea className='w-full' onChange={(e) => setTopic(e?.target.value)} />
                </div>
                <div className='w-full max-w-xl mt-7'>
                    <label>Select Duration of Video (In Seconds):</label>
                    <Dropdown defaultvalue={5} handleInputChange={(value) => setDuration(value)} options={durationOption} />
                </div>
                <Button 
                    className='w-full mt-5 max-w-xl' 
                    disabled={!Topic?.length || duration === 0} 
                    onClick={handleGeneration}
                >
                {loading ? <Loader2 className=' animate-spin'/>:'Generate'}
                </Button>
            </div>
        </div>
    )
}
export default CreateVideoGen;
