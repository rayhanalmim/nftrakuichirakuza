import React,{useState} from 'react'
import { Button } from '../../components/Button/Primary'

import OtpInput from 'react-otp-input';
const ForgotPassword = () => {
    const [otp,setOtp]= useState('');
    const handleChange=()=> {
       
       setOtp(otp);
    }
  return (
    <div>
              <div className='py-[9rem] bg-collection-img bg-no-repeat bg-cover  w-full mx-auto px-5'>
        <div className="max-w-[500px] w-full mx-auto shadow-xl rounded-lg bg-white py-[3rem] px-5 mt-5">
<h2 className='text-center text-3xl  capitalize '> Email</h2>

            
<input type="text" placeholder='Email Address ' className='w-full border p-3 rounded my-3'/> 

{/* <OtpInput
        // value={this.state.otp}
        value={setOtp}
        onChange={handleChange}
        numInputs={6}
        separator={<span>-</span>}
      /> */}
<div className='text-center pt-5'>
<Button title="Submit"/>
</div>





</div>

<div>
  

</div>
        
         
     
    </div>
    </div>
    
    
  )
}

export default ForgotPassword