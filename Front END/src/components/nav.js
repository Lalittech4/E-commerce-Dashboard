import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import{img} from"./src/pics/logo.png.jpg"



const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    const auth = localStorage.getItem('user')
    return (
        <div className='heading'>
            <h1>AMAZON</h1>
            {auth ? <ul className="navbar">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product </Link></li>
                {/* <li><Link to="/update">Update </Link></li> */}
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                {/* <li><Link to="/profile">PROFILE</Link></li> */}

            </ul>
                :
                <ul className='navbar nav-right'>

                    <li><Link to="/Signup">Signup</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
            }

        </div>

    )
}

export default Nav;