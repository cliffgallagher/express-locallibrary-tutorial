import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import NewBook from './NewBook';
import BookListElement from './BookListElement';

const BookComponent = () => {
    const [displayBooks, setDisplayBooks] = useState(true);
    const [bookArray, setBookArray] = useState();

    const getBookList = async () => {
        const response = await fetch('catalog/enhanced');
        const body = await response.json();
        console.log("body before setBookArray: " + JSON.stringify(body));
        setBookArray(() => {
            return body.map(element => <BookListElement key={element.book_id} bookID={element.book_id} title={element.title} authorID={element.author_id} author={`${element.first_name} ${element.family_name}`} isbn={element.isbn} genreName={element.name} genreID={element.genre_id} summary={element.summary}/>);
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
                    <NewBook getBookListMyComponentNewToNewBook={getBookList}/>
                    <BookList bookArray={bookArray}/>
                </div>
            )}
        </div>
    )
}

export default BookComponent;