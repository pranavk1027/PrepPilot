'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { generateFromPrompt } from '@/utils/GeminiAiModel'
import { UserAnswer } from '@/utils/schema'

function RecordAnswerSection({interviewData,mockInterviewQuestion,activequestionindex}) {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText ({
        continuous: true,
        useLegacyResults: false
      });

 const [userAnswer,setAnswer]=useState("")
const [loading,setloading]=useState(false );

const {user}=useUser();



    



const saveUserAnswer=async()=>{
    if(isRecording){

        setloading(true);
        stopSpeechToText()
        if(userAnswer?.length<10){
          setloading(false)
          toast('Error while saving your answer,Please record again')
          return
        }
        const feedbackPrompt="Question:"+mockInterviewQuestion[activequestionindex]?.question+
  ",User Answer:"+userAnswer+",Depending on question and answer for given interview quesion"+
  "please give us rating for answer and feedback as area of improvement if any "+
  "in just 3 to 5 lines to improve it in JSON  format with rating field and feedback field";
   const result =await generateFromPrompt(feedbackPrompt);

const mockJSONresp=await (result.response.text()).replace('```json','').replace('```','');

  const JsonFeedbackResp=JSON.parse(mockJSONresp);
  console.log(JsonFeedbackResp);
       const resp = await db.insert(UserAnswer)
  .values({
    mockIdRef: interviewData?.mockId,
    question: mockInterviewQuestion[activequestionindex]?.question,
    correctAns: mockInterviewQuestion[activequestionindex]?.answer,
    userAns: userAnswer,
    feedback: JsonFeedbackResp?.feedback,
    rating: JsonFeedbackResp?.rating,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    createdAt: moment().format('DD-MM-YYYY')
  })
  if(resp)
{
  toast('User Answer recorder successfully')
}
        
   setAnswer('');
    setloading(false)
    }else {
        startSpeechToText();
    }
}


 const UpdateUserAnswerInDb=async()=>{
  
  console.log(userAnswer);
  
  setloading(true);
  
 
  


  const resp=await db.insert(userAnswer).values({
       mockIdRef:interviewData?.mockId,
       question:mockInterviewQuestion[activequestionindex]?.Question,
       correctAns:mockInterviewQuestion[activequestionindex]?.answer,
       userAns:userAnswer,
       feedback:JsonFeedbackResp?.feedback,
       rating:JsonFeedbackResp?.rating,
       userEmail:user?.primaryEmailAddress.emailAddress,
       createdAt:moment().format('DD-MM-yyyy')

  })
  if(resp){
      toast('User Answer recorder successfully')
 
  setAnswer('');
 setResults([])
 }
 setResults([])
 setloading(false);
 }

  return (
   <div className='flex items-center justify-center flex-col '>
     <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam1.png'} width={200} height={200} className='absolute'  alt='logo'/>
         <Webcam  mirrored={true} 
          style={{
            height:300,
            width:'100%',
            zIndex:10
          }}
          />
          
    </div>
    <Button disabled={loading} variant="outline" className="my-10" onClick={saveUserAnswer}>
        {isRecording? 
        <h2 className='text-red-600 animate-pulse flex gap-2 items-center'><StopCircle/>Stop Recording</h2>:
       <h2 className='text-primary flex gap-2 items-center'> <Mic/>Record Answer</h2> }
       </Button>

       <Button onClick={()=>console.log(userAnswer)}>Show userAnswer</Button>
       
    
   </div>
  )
}

export default RecordAnswerSection