import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })

    const handlelogin = async () => {

        console.log(email, password);

        let result = await fetch('http://localhost:2000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await result.json();
        console.log(data);
        if (data.name) {
            localStorage.setItem("user", JSON.stringify(data));
            navigate('/')
        } else {
            alert(" enter valid email id");
        }
    }

    return (
        <div className='headingsignup'>
            <h2> Login</h2>
            <input className='inputsignup' type="text" onChange={(e) => { setemail(e.target.value) }} value={email} placeholder="Enter E-mail" />
            <input className='inputsignup' type="Password" onChange={(e) => { setpassword(e.target.value) }} value={password} placeholder='Enter Password' />
            <button onClick={handlelogin} className='btnsignup'>LOGIN</button>
        </div>

    );
};

export default Login;