import React, { useState, useEffect, useContext } from 'react';
import BookList from './BookList';
import NewBook from './NewBook';
import BookListElement from './BookListElement';
import BookPopupForUpdate from './BookPopupForUpdate';
import BookPopupForDelete from './BookPopupForDelete';
//import {AuthContext} from '../../context/auth-context';
import ReactGA from 'react-ga';
import useAuth from '../../hooks/use-auth';

const BookComponent = (props) => {
    const [displayBooks, setDisplayBooks] = useState(true);
    const [bookArray, setBookArray] = useState();
    const [displayBookPopupForUpdate, setDisplayBookPopupForUpdate] = useState(false);
    const [displayBookPopupForDelete, setDisplayBookPopupForDelete] = useState(false);
    const [bookIDForBookPopupForUpdate, setbookIDForBookPopupForUpdate] = useState();
    const [authorIDForBookPopupForUpdate, setAuthorIDForBookPopupForUpdate] = useState();
    const [genreIDForBookPopupForUpdate, setGenreIDForBookPopupForUpdate] = useState();
    const [newBookInfo, setNewBookInfo] = useState();
    //const auth = useContext(AuthContext);

    const {auth, body} = useAuth();

    async function getBookList() {
    
        if (typeof body === 'object') {
            if (body.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
        }
        console.log('body in BookComponent: ' + JSON.stringify(body));
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
        ReactGA.initialize('UA-218818511-1');
        ReactGA.pageview('/book_component');
        getBookList();
    }, []);

    return (<div data-cy='book_component'>
            <NewBook getBookListMyComponentNewToNewBook={getBookList} />
            <BookList bookArray={bookArray}/>
        </div>)
}

export default BookComponent;