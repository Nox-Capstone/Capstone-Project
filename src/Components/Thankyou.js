import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Thankyou = () =>{
    const navigate = useNavigate();

   
  useEffect(()=>{
      const timeout = setTimeout(()=>{
      navigate("/")
    }, 10000)
    return () =>{
      clearTimeout(timeout)
    }
  },[])

    return(
        <div className="thankYou">
            <h1>Thank you for shopping with us!</h1>
            <Link to={'/'}>You will be redirected in 10 seconds <span className='clickMe'>click here</span> if you want to go back now</Link>
        </div>
    )
}

export default Thankyou;