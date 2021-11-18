import React from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {

    function sayHello() {
        console.log("hi I'm fabars");
    }
    
    return (
        <>
            <div className="navbar">
                <FaBars onClick={sayHello}/>
            </div>
        </>

    )
}

export default Navbar;