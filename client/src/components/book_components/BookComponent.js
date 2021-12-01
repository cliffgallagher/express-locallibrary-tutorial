import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import NewBook from './NewBook';
import BookListElement from './BookListElement';
import BookPopupForUpdate from './BookPopupForUpdate';
import BookPopupForDelete from './BookPopupForDelete';
import DisplaySelector from '../DisplaySelector';
import ChosenElement from '../ChosenElement';

const BookComponent = (props) => {
    const [displayBooks, setDisplayBooks] = useState(true);
    const [bookArray, setBookArray] = useState();
    const [displayBookPopupForUpdate, setDisplayBookPopupForUpdate] = useState(false);
    const [displayBookPopupForDelete, setDisplayBookPopupForDelete] = useState(false);
    const [bookIDForBookPopupForUpdate, setbookIDForBookPopupForUpdate] = useState();
    const [authorIDForBookPopupForUpdate, setAuthorIDForBookPopupForUpdate] = useState();
    const [genreIDForBookPopupForUpdate, setGenreIDForBookPopupForUpdate] = useState();
    const [newBookInfo, setNewBookInfo] = useState();
    const [displayElement, setDisplayElement] = useState(false);

    /*function bookListElementMouseEnterHandler() {
        setDisplayBookPopupForUpdate(true);
    }*/

    async function getBookList() {
        const response = await fetch('catalog/enhanced');
        const body = await response.json();
        //console.log("body before setBookArray: " + JSON.stringify(body));
        setBookArray(() => {
            return body.map(element => <BookListElement key={element.book_id} bookID={element.book_id} title={element.title} authorID={element.author_id} author={`${element.first_name} ${element.family_name}`} isbn={element.isbn} genreName={element.name} genreID={element.genre_id} summary={element.summary} setDisplayBookPopupForUpdate={setDisplayBookPopupForUpdate} bookPropsFromBookListElementToBookComponent={bookPropsFromBookListElementToBookComponent} setDisplayBookPopupForDelete={setDisplayBookPopupForDelete} setDisplayElement={setDisplayElement}/>);
        });
        console.log(bookArray);
    }

    function bookPropsFromBookListElementToBookComponent(bookID, authorID, genreID) {
        setbookIDForBookPopupForUpdate(bookID);
        setAuthorIDForBookPopupForUpdate(authorID);
        setGenreIDForBookPopupForUpdate(genreID);


    }

    function newBookInfoNewBookToBookComponent(newBookInfo) {
        //console.log("newbookinfo in bookcomponent:" + JSON.stringify(newBookInfo));
        const {title, author_id, summary, isbn, genre_id} = newBookInfo;
        const objectForDuplicateWarning = {
            title: title,
            author_id: author_id,
            summary: summary,
            isbn: isbn,
            genre_id: genre_id
        }
        setNewBookInfo(objectForDuplicateWarning);
    }

    useEffect(() => {
        getBookList();
    }, []);

    return (
        <div>
            {displayBooks && !displayBookPopupForUpdate && !displayBookPopupForDelete && !displayElement && (
                <div>
                    <NewBook getBookListMyComponentNewToNewBook={getBookList} />
                    <BookList bookArray={bookArray}/>
                </div>
            )}
            {displayElement && (
                <div>
                    <NewBook getBookListMyComponentNewToNewBook={getBookList} />
                    <BookList bookArray={bookArray}/>
                    <ChosenElement />    
                </div>
            )}
            {displayBookPopupForUpdate && (
                <div>
                    <NewBook getBookListMyComponentNewToNewBook={getBookList}/>
                    <BookList bookArray={bookArray}/>
                    <BookPopupForUpdate bookID={bookIDForBookPopupForUpdate} authorID={authorIDForBookPopupForUpdate} genreID={genreIDForBookPopupForUpdate} setDisplayBookPopupForUpdate={setDisplayBookPopupForUpdate} getBookList={getBookList}/>
                </div>
            )}
            {displayBookPopupForDelete && (
                <div>
                    <NewBook getBookListMyComponentNewToNewBook={getBookList}/>
                    <BookList bookArray={bookArray}/>
                    <BookPopupForDelete getBookList={getBookList} bookID={bookIDForBookPopupForUpdate} authorID={authorIDForBookPopupForUpdate} genreID={genreIDForBookPopupForUpdate} setDisplayBookPopupForDelete={setDisplayBookPopupForDelete}/>
                </div>
            )}
        </div>
    )
}

export default BookComponent;