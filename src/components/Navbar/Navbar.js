import React from 'react'
import './Navbar.css'
import NavBack from '../NavBackground/NavBack'
import DropDownBtn from '../DropDownBtn/DropDownBtn'
const Navbar = ({onAction}) => {
    return (
        <div className='navbar'>
            <div className='leftNav'>
                <div className='background'>
                    <NavBack />
                </div>
                <div className='logo'>
                    <h1 >COBU </h1><h1 id='h1'>- COURSE BUILDER</h1>
                </div>
            </div>
            <DropDownBtn onAction={onAction}/>

        </div>
    )
}

export default Navbar
