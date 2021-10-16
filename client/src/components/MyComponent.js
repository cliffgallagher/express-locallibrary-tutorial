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
            console.log(arrayFromJSON);
            setMyArray((prevState) => {
                return [...prevState, arrayFromJSON.map((element) => <DataItem key={element.book_id} title={element.title} isbn={element.isbn} summary={element.summary}/>)]
            })       
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <div>
            <p>new paragraph</p>
            <NewBook getBookList={getBookList}/>
            <BookList getBookList={getBookList} myArray={myArray}/>
        </div>
    );

}

export default MyComponent;