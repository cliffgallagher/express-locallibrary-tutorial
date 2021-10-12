import React, {useEffect, useState } from 'react';
import NewBook from './NewBook';
import BookList from './BookList';

const MyComponent = () => {
    

    return(
        <div>
            <NewBook />
            <BookList />
        </div>
    );

}

export default MyComponent;