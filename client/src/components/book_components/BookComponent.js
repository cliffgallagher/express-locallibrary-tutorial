import React, { useState, useEffect, useContext } from 'react';
import BookList from './BookList';
import NewBook from './NewBook';
import BookListElement from './BookListElement';
import BookPopupForUpdate from './BookPopupForUpdate';
import BookPopupForDelete from './BookPopupForDelete';
import {AuthContext} from '../../context/auth-context';

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

    /*function bookListElementMouseEnterHandler() {
        setDisplayBookPopupForUpdate(true);
    }*/

    async function getBookList() {
        //console.log('props.token in BookComponent' + props.token);
        //const fakeToken = props.token.concat('x');
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
        //console.log("body before setBookArray: " + JSON.stringify(body));
        setBookArray(() => {
            return body.map(element => <BookListElement key={element.book_id} bookID={element.book_id} title={element.title} authorID={element.author_id} author={`${element.first_name} ${element.family_name}`} isbn={element.isbn} genreName={element.name} genreID={element.genre_id} summary={element.summary} setDisplayBookPopupForUpdate={setDisplayBookPopupForUpdate} bookPropsFromBookListElementToBookComponent={bookPropsFromBookListElementToBookComponent} setDisplayBookPopupForDelete={setDisplayBookPopupForDelete} getBookList={getBookList}/>);
        });
        //console.log(bookArray);
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

    return (<div>
            <NewBook getBookListMyComponentNewToNewBook={getBookList} />
            <BookList bookArray={bookArray}/>
        </div>)
}

export default BookComponent;