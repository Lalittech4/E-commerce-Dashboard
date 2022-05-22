import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {

            navigate('/');
        }

    })

    const collectdata = async () => {
        console.log({ name, email, password })
        const result = await fetch('http://localhost:2000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        let data = await result.json();
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/');

    }


    return (
        <div className='headingsignup'>
            <h2>SignUp</h2>

            <input className='inputsignup' type='text' onChange={(e) => { setName(e.target.value) }} value={name} placeholder='Enter Your Name' />
            <input className='inputsignup' type='email' onChange={(e) => { setemail(e.target.value) }} value={email} placeholder='Enter Your email' />
            <input className='inputsignup' type='password' onChange={(e) => { setpassword(e.target.value) }} value={password} placeholder='Enter Your Password' />
            <button className='btnsignup' onClick={collectdata} type="button">REGISTER</button>
        </div>
    )
}

export default Signup;