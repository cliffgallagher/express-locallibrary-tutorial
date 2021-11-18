import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const NavbarOptions = () => {
    return (
        <div>
            <AiOutlineClose />
            <ul>
                <li>Books</li>
                <li>Authors</li>
                <li>Genres</li>
            </ul>
        </div>
    )
}

export default NavbarOptions;