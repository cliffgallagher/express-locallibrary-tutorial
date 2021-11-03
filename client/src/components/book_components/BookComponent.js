import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import NewBook from './NewBook';
import BookListElement from './BookListElement';
import BookPopupForUpdate from './BookPopupForUpdate';

const BookComponent = () => {
    const [displayBooks, setDisplayBooks] = useState(true);
    const [bookArray, setBookArray] = useState();
    const [displayBookPopupForUpdate, setDisplayBookPopupForUpdate] = useState(false);
    const [bookIDForBookPopupForUpdate, setbookIDForBookPopupForUpdate] = useState();
    const [authorIDForBookPopupForUpdate, setAuthorIDForBookPopupForUpdate] = useState();
    const [genreIDForBookPopupForUpdate, setGenreIDForBookPopupForUpdate] = useState();

    /*function bookListElementMouseEnterHandler() {
        setDisplayBookPopupForUpdate(true);
    }*/

    async function getBookList() {
        const response = await fetch('catalog/enhanced');
        const body = await response.json();
        //console.log("body before setBookArray: " + JSON.stringify(body));
        setBookArray(() => {
            return body.map(element => <BookListElement key={element.book_id} bookID={element.book_id} title={element.title} authorID={element.author_id} author={`${element.first_name} ${element.family_name}`} isbn={element.isbn} genreName={element.name} genreID={element.genre_id} summary={element.summary} setDisplayBookPopupForUpdate={setDisplayBookPopupForUpdate} bookPropsFromBookListElementToBookComponent={bookPropsFromBookListElementToBookComponent}/>);
        });
        console.log(bookArray);
    }

    function bookPropsFromBookListElementToBookComponent(bookID, authorID, genreID) {
        setbookIDForBookPopupForUpdate(bookID);
        setAuthorIDForBookPopupForUpdate(authorID);
        setGenreIDForBookPopupForUpdate(genreID);
    }

    useEffect(() => {
        getBookList();
    }, [])

    return (
        <div>
            <button>Books</button>
            <button>Authors</button>
            <button>Genres</button>
            {displayBooks && !displayBookPopupForUpdate && (
                <div>
                    <NewBook getBookListMyComponentNewToNewBook={getBookList}/>
                    <BookList bookArray={bookArray}/>
                </div>
            )}
            {displayBookPopupForUpdate && (
                <div>
                    <NewBook getBookListMyComponentNewToNewBook={getBookList}/>
                    <BookList bookArray={bookArray}/>
                    <BookPopupForUpdate bookID={bookIDForBookPopupForUpdate} authorID={authorIDForBookPopupForUpdate} genreID={genreIDForBookPopupForUpdate}/>
                </div>
            )}
        </div>
    )
}

export default BookComponent;