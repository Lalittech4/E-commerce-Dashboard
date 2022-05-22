import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Productlist = () => {
    const [product, setproduct] = useState('');

    const getproduct = async () => {

        let result = await fetch('http://localhost:2000/products');
        let data = await result.json();
        setproduct(data);
        // console.log(product);
    }

    useEffect(() => {
        getproduct();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:2000/Products/${id}`, {
            method: "DELETE"
        })
        let data = await result.json();
        if (data) {
            getproduct();
        }
    };

    const searchHandle = async (event) => {
        // console.log(e.target.value)
        let key = event.target.value;
        if (key) {

            let result = await fetch(`http://localhost:2000/search/${key}`);
            let data = await result.json();
            if (data) {
                setproduct(data);
            } else {
                console.log("result not matched");
            }
        } else {
            getproduct();
        }


    }


    return (
        <div className="product-list">
            <h2>Product List</h2>
            <input className="searchinput" type="text" placeholder="Search here" onChange={searchHandle} />
            <ul>
                <li>no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>company</li>
                <li>Operation</li>
                <li>Operation</li>

            </ul>

            {
                product.length > 0 ? product && product.map((item, index) =>
                    <ul key={item._id}>

                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)} className='deletebtn'>Delete</button>
                        </li>
                        <li className="updatelink" >
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                    : <h1>No Match Found</h1>
            }
        </div>
    )

}

export default Productlist;