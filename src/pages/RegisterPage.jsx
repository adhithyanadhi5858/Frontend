import React, { useState } from 'react'
import axios from 'axios'
import "../styles/style.css"

function Register() {

    const [input , setInput] = useState({
        name:"",
        email:"",
        password:"",
    })
   


 const Submit = (e)=>{
    e.preventDefault()
    console.log(input)
    
    
    axios.post("http://localhost:3000/user/register", input)
    .then(res=>{
        alert(res.data.message)
    })
    .catch(err=>{
        alert(err.response.data.message)
    })


   
 }

 const InputHandler=(e)=>{
   
    const tempInput = {...input}
    tempInput[e.target.name] = e.target.value

   setInput(tempInput)

   

 }


  return (


   <>
    <div className='form-body'>
        <form onSubmit={Submit} className='Form'  >

            <input className='input' type="text" name='Name' placeholder='Enter Your Name'onChange={InputHandler} /><br/>
            <input className='input' type="email" name='Email' placeholder='Email' onChange={InputHandler}/><br />
            <input className='input' type="password" name='Password' placeholder='Password' onChange={InputHandler} /><br />
            <input className='btn' type="submit" value='SignUp' />

        </form>
    </div>
   </> 
  )
}

export default Register