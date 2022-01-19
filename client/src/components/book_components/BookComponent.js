import React, { useState, useEffect, useContext } from 'react';
import BookList from './BookList';
import NewBook from './NewBook';
import BookListElement from './BookListElement';
import BookPopupForUpdate from './BookPopupForUpdate';
import BookPopupForDelete from './BookPopupForDelete';
import {AuthContext} from '../../context/auth-context';
import MetaTags from 'react-meta-tags';

const BookComponent = (props) => {
    const [displayBooks, setDisplayBooks] = useState(true);
    const [bookArray, setBookArray] = useState();
    const [displayBookPopupForUpdate, setDisplayBookPopupForUpdate] = useState(false);
    const [displayBookPopupForDelete, setDisplayBookPopupForDelete] = useState(false);
    const [bookIDForBookPopupForUpdate, setbookIDForBookPopupForUpdate] = useState();
    const [authorIDForBookPopupForUpdate, setAuthorIDForBookPopupForUpdate] = useState();
    const [genreIDForBookPopupForUpdate, setGenreIDForBookPopupForUpdate] = useState();
    const [newBookInfo, setNewBookInfo] = useState();
    const auth = useContext(AuthContext);

    async function getBookList() {
        const response = await fetch('catalog/enhanced', {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });
        const body = await response.json();
        if (typeof body === 'object') {
            if (body.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
        }
        setBookArray(() => {
            return body.map(element => <BookListElement key={element.book_id} bookID={element.book_id} title={element.title} authorID={element.author_id} author={`${element.first_name} ${element.family_name}`} isbn={element.isbn} genreName={element.name} genreID={element.genre_id} summary={element.summary} setDisplayBookPopupForUpdate={setDisplayBookPopupForUpdate} bookPropsFromBookListElementToBookComponent={bookPropsFromBookListElementToBookComponent} setDisplayBookPopupForDelete={setDisplayBookPopupForDelete} getBookList={getBookList}/>);
        });
    }

    function bookPropsFromBookListElementToBookComponent(bookID, authorID, genreID) {
        setbookIDForBookPopupForUpdate(bookID);
        setAuthorIDForBookPopupForUpdate(authorID);
        setGenreIDForBookPopupForUpdate(genreID);


    }

    useEffect(() => {
        getBookList();
    }, []);

    return (<div data-cy='book_component'>
            <MetaTags>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </MetaTags>
            <NewBook getBookListMyComponentNewToNewBook={getBookList} />
            <BookList bookArray={bookArray}/>
        </div>)
}

export default BookComponent;