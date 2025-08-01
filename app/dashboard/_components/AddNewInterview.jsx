"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateFromPrompt } from '@/utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import {useUser} from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';

function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false);
    const [jobPosition, setJobPosition] = useState();
const [jobDesc, setJobDesc] = useState();
const [jobExperience, setJobExperience] = useState();
const [loading,setLoading]=useState(false);
const [jsonResponse,setJsonResponse]=useState([]);

const {user}=useUser();

const onSubmit=async (e)=>{
  setLoading(true);
  e.preventDefault();
  
 const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us 5 Interview question along with Answer in JSON format, Give us question and answer field on JSON`;
 let result=await generateFromPrompt(InputPrompt);
 console.log(result);
 
 result=await result.replace('```json','').replace('```','')
 
 setJsonResponse(result);

 if(result)
 {const resp=await db.insert(MockInterview).values(
  {
    mockId: uuidv4(),
    jsonMockResp:result,
    jobPosition:jobPosition,
    jobDesc:jobDesc,
    jobExperience:jobExperience,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    createdAt:moment().format('DD-MM-yyyy')
  }
 ).returning({mockId:MockInterview.mockId})
console.log(resp);
}else {
  console.log("error");
  
}
 setLoading(false);
 
};

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
         onClick={()=>setOpenDailog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDailog}>

  <DialogContent className={"max-w-2xl"}>
    <DialogHeader>
      <DialogTitle className={"text-2xl"}>Tell us more about your job interview</DialogTitle>
      <DialogDescription>
       <form  onSubmit={onSubmit}>
        <div>
        
        Add your details
       </div>
       <div className='mt-7 my-3'>
  <label>Job Role/Job Position</label>
  <Input placeholder="Ex. Full Stack Developer"required 
    onChange={(event)=>setJobPosition(event.target.value)} />
</div>

<div className='my-3'>
  <label>Job Description/ Tech Stack (In Short)</label>
  <Textarea placeholder="Ex. React, Angular, NodeJs, MySql"  required
  onChange={(event)=>setJobDesc(event.target.value)}/>
</div>

<div className='my-3'>
  <label>Years of experience</label>
  <Input placeholder="Ex. 5" type="number" max="100" required
  onChange={(event)=>setJobExperience(event.target.value)}/>
</div>

        <div className='flex gap-5 justify-end'>
          <Button variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading?
            <>
            <LoaderCircle className=' animate-spin ' />Generating Questions</>:`Start Interview`}</Button>
        </div>
       </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  );
}

export default AddNewInterview;
