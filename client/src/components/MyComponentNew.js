import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import DataItem from './DataItem';
import NewBook from './NewBook';

const MyComponentNew = () => {
    const [displayBooks, setDisplayBooks] = useState(true);
    const [bookArray, setBookArray] = useState();

    const getBookList = async () => {
        const response = await fetch('catalog/enhanced');
        const body = await response.json();
        console.log("body before setBookArray: " + JSON.stringify(body));
        setBookArray(() => {
            return body.map(element => <p>{element.book_id}</p>);
        });
        console.log(bookArray);
    }

    useEffect(() => {
        getBookList();
    }, [])

    return (
        <div>
            <button>Books</button>
            <button>Authors</button>
            <button>Genres</button>
            {displayBooks && (
                <div>
                    <NewBook />
                    <ul>{bookArray}</ul>
                </div>
            )}
        </div>
    )
}

export default MyComponentNew;