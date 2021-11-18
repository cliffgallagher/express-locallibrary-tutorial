import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const NavbarOptions = () => {
    
    function helloBooks() {
        console.log("hello books");
    }

    function helloAuthors() {
        console.log("hello authors");
    }
    
    return (
        <div>
            <AiOutlineClose />
            <ul>
                <li onClick={helloBooks}>Books</li>
                <li onClick={helloAuthors}>Authors</li>
                <li>Genres</li>
            </ul>
        </div>
    )
}

export default NavbarOptions;