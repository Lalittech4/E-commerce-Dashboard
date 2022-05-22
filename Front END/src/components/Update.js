import React, { useEffect, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';

const Update = () => {

    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [company, setcompany] = useState('');
    const params = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        // console.log(params);
        getProductDetails();
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:2000/Products/${params.id}`);
        let data = await result.json();
        setname(data.name);
        setprice(data.price);
        setcategory(data.category);
        setcompany(data.company);

    }

    const updateproduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:2000/Products/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            let  data = await result.json();
            navigate('/')
            console.log(data);

    };

    return (
        <div className="headingsignup">
            <h2>UPDATE</h2>
            <input className='inputsignup' type="text" onChange={(e) => { setname(e.target.value) }} value={name} placeholder='Enter Product Name' />
            {/* {!name && error && <span className="invalid-input">Enter Name In The Field</span>} */}
            <input className='inputsignup' type="text" onChange={(e) => { setprice(e.target.value) }} value={price} placeholder='Enter Product Price' />
            {/* {!price && error && <span className="invalid-input">Enter Price In The Field</span>} */}
            <input className='inputsignup' type="text" onChange={(e) => { setcategory(e.target.value) }} value={category} placeholder='Enter Product category' />
            {/* {!category && error && <span className="invalid-input">Enter category In The Field</span>} */}
            <input className='inputsignup' type="text" onChange={(e) => { setcompany(e.target.value) }} value={company} placeholder='Enter Product Company' />
            {/* {error && !company && <span className="invalid-input">Enter company In The Field</span>} */}
            <button onClick={updateproduct} className='btnsignup'>UPDATE</button>
        </div>
    )
}

export default Update;