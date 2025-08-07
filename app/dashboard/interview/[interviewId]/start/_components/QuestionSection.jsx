import { Lightbulb, Volume2 } from 'lucide-react'
import React, { useEffect } from 'react'

function QuestionSection({MockInterviewQuestion,activequestionindex}) {
   console.log("hiashfa");
  console.table(MockInterviewQuestion); // if it's an array of objects

    useEffect(()=>{
 
           
    },[MockInterviewQuestion])
    
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
  
      // Ensure voices are loaded
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Add a listener for when voices are loaded
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          console.log('Voices loaded:', voices);
  
          // Set a voice explicitly (e.g., the first available voice)
          if (voices.length > 0) {
            speech.voice = voices[0];
          }
          window.speechSynthesis.speak(speech);
        };
      } else {
        // Voices already loaded
        speech.voice = voices[0]; // Set a voice explicitly
        window.speechSynthesis.speak(speech);
      }
    } else {
      alert('Sorry, your browser does not support text-to-speech');
    }
  };
  
   
  
  
 
  
  
  
  
  return MockInterviewQuestion && (
    <div className='p-5 border rounded'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4'>
           {MockInterviewQuestion && MockInterviewQuestion.map((question,index)=>(
            <h2 key={index} className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activequestionindex==index && 'bg-blue-700 text-white'}`}>
                Question #{index+1}</h2> 
           ))}
            
           
    </div>
    <h2 className='my-5 text-md md:text-lg'>{MockInterviewQuestion[activequestionindex]?.question} </h2>
   
   <Volume2 className=' cursor-pointer' onClick={()=>textToSpeech(MockInterviewQuestion[activequestionindex]?.Question)}/>
   
   
   <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
    <h2 className='flex gap-2 items-center text-blue-700'>
        <Lightbulb/>
        <strong>Note:</strong>
    </h2>
    <h2 className='text-sm text-primary my-2'>
    Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.
    </h2>
   </div>
   
    </div>
  )
}

export default QuestionSection