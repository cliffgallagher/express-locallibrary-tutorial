import React, {useEffect, useState } from 'react';
import NewBook from './NewBook';
import BookList from './BookList';

const MyComponent = () => {
    

    return(
        <div>
            <p>new paragraph</p>
            <NewBook />
            <BookList />
        </div>
    );

}

export default MyComponent;