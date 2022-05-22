import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [company, setcompany] = useState('');
    const [error, seterror] = useState('')
    const navigate = useNavigate();


    const addproduct = async () => {

        if (!name || !price || !category || !company) {

            seterror(true)
            return false;
        }
        const userid = JSON.parse(localStorage.getItem('user'))._id;

        const result = await fetch('http://localhost:2000/Add-Product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userid }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await result.json();
        console.log(data);

        navigate('/');

    }
    return (
        <div className="headingsignup">
            <h2>PRODUCT</h2>
            <input className='inputsignup' type="text" onChange={(e) => { setname(e.target.value) }} value={name} placeholder='Enter Product Name' />
            {!name && error && <span className="invalid-input">Enter Name In The Field</span>}
            <input className='inputsignup' type="text" onChange={(e) => { setprice(e.target.value) }} value={price} placeholder='Enter Product Price' />
            {!price && error && <span className="invalid-input">Enter Price In The Field</span>}
            <input className='inputsignup' type="text" onChange={(e) => { setcategory(e.target.value) }} value={category} placeholder='Enter Product category' />
            {!category && error && <span className="invalid-input">Enter category In The Field</span>}
            <input className='inputsignup' type="text" onChange={(e) => { setcompany(e.target.value) }} value={company} placeholder='Enter Product Company' />
            {error && !company && <span className="invalid-input">Enter company In The Field</span>}
            <button onClick={addproduct} className='btnsignup'>ADD PRODUCT</button>
        </div>
    )
}

export default AddProduct;