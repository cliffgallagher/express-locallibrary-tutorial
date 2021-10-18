import React, {useEffect, useState } from 'react';
import NewBook from './NewBook';
import BookList from './BookList';
import DataItem from './DataItem';

const MyComponent = () => {
    const [myArray, setMyArray] = useState([]);
    
    const getBookList = async () => {
        try {
            const promise = await fetch("/catalog");
            const arrayFromJSON = await promise.json();
            //console.log(arrayFromJSON);
            setMyArray(arrayFromJSON)      
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getBookList();
    }, []);

    return(
        <div>
            <p>new paragraph</p>
            <NewBook getBookList={getBookList}/>
            <BookList getBookList={getBookList} myArray={myArray}/>
        </div>
    );

}

export default MyComponent;