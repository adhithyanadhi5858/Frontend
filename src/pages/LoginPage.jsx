import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "../styles/style.css"

function Login() {
    const [input , setInput] = useState({
        Email:"",
        Password:"",
    })
    
    


    //Submit the Login
 const Submit = (e)=>{
    e.preventDefault()
    console.log(input)
    
    
    axios.post("http://localhost:3000/user/login", input)
    .then(res=>{
        alert(res.data.message)
        localStorage.setItem("token",res.data.token)
        
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
   <img className='image-style' src="src/media/Vibbora_Logo__White_-removebg-preview.png" alt="" />
    <div className='form-body'>
        <form onSubmit={Submit} className='Form'  >

            
            <input className='input' type="email" name='Email' placeholder='Email' onChange={InputHandler}/><br />
            <input className='input' type="password" name='Password' placeholder='Password' onChange={InputHandler} /><br />
            <input className='btn' type="submit" value='Login' />

        </form>
    </div>
   </> 
  )
    
}

export default Login
