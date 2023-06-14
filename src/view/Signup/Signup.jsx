import React from 'react'
import { Button } from '../../components/Button/Primary'
import { Checkbox ,Divider} from 'antd';
import { Link } from 'react-router-dom';
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const Signup = () => {
  return (
    <div className='py-[5rem] bg-collection-img bg-no-repeat bg-cover  w-full mx-auto px-5 '>
        <div className="max-w-[500px] w-full mx-auto shadow-xl rounded-lg bg-white py-5 px-5 mt-5">
      <h2 className='text-center text-3xl  capitalize '>Signup</h2>
      <input type="text" placeholder='Full Name ' className='w-full border p-3 rounded my-3'/> 
      <input type="text" placeholder='User Name ' className='w-full border p-3 rounded my-3'/> 
      <input type="text" placeholder='Password ' className='w-full border p-3 rounded my-3'/> 
      <input type="text" placeholder='Confirm Password' className='w-full border p-3 rounded my-3'/> 
       
    
        <div className='flex justify-between w-full border p-3 rounded my-3'>
       <h5 className='text-grey'>0xfDB86...BFDA</h5>
        <h6 className='mb-0 text-grey'>copy</h6>
        </div>
        <div className='pt-3 pb-3'>
        <Checkbox onChange={onChange}>
            <h5>Remember me 
                </h5></Checkbox>
     
        </div>
       
    
    <p>By creating an account you agree to our <Link to="/" >Terms & Privacy</Link>.</p>
    
      <div className='w-full mt-5 text-center'>
      <Button title=" create Account" className="w-full mx-auto"/>
      </div>
      <div className="w-[70%] mx-auto">
                    <Divider>Or</Divider>
                  </div>

                  <div className="w-[70%] mx-auto ">
                    <p className='text-center'>Already have an account ?</p>
                    <div className='text-center underline text-md' >
                        <Link to="/login">
                        {/* <Button title="Login"></Button> */}
                        Login
                        </Link>
                
                    </div>
                 
                  </div>
        </div>

    </div>
  )
}

export default Signup