import React, {useEffect, useState } from 'react';
import NewBook from './NewBook';
import BookList from './BookList';
import DataItem from './DataItem';
import PopupForUpdate from './PopupForUpdate';
import PopupForDelete from './PopupForDelete';

const MyComponent = () => {
    const [myArray, setMyArray] = useState([]);
    const [displayPopupForUpdate, setDisplayPopupForUpdate] = useState(false);
    const [bookID, setBookID] = useState();
    const [authorID, setAuthorID] = useState();
    const [genreID, setGenreID] = useState();
    //const [bookID, setBookToUpdate] = useState();
    const [displayPopupForDelete, setDisplayPopupForDelete] = useState(false);
    
    async function getBookList() {
        try {
            const promise = await fetch("/catalog/enhanced");
            const arrayFromJSON = await promise.json();
            console.log("getBookList in MyComponent retrieved this list from MySQL: " + JSON.stringify(arrayFromJSON));
            setMyArray(() => {
                return arrayFromJSON.map((element) => <DataItem key={element.book_id} bookID={element.book_id} title={element.title} authorID={element.author_id} author={`${element.first_name} ${element.family_name}`} isbn={element.isbn} genre={element.name} genreID={element.genre_id} summary={element.summary} triggerPopupForUpdate={popupForUpdateHandler} receiveBookIDFromDataItem={passBookIDToPopupForUpdate} triggerPopupForDelete={popupForDeleteHandler}/>);
            });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getBookList();
    }, []);


    /*const printUserInfo = (userInfo) => {
        console.log("userInfo at MyComponent level: " + JSON.stringify(userInfo));
    }*/

    function popupForUpdateHandler(boolean) {
        setDisplayPopupForUpdate(boolean);
    }

    function passBookIDToPopupForUpdate(bookID, authorID, genreID) {
        //console.log("bookID in MyComponent: " + bookID + ", authorID in my component: " + authorID);
        setBookID(bookID);
        setAuthorID(authorID);
        setGenreID(genreID);
    }

    function popupForDeleteHandler(boolean) {
        setDisplayPopupForDelete(boolean);
    }

    return <div>
        {!displayPopupForUpdate && !displayPopupForDelete && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
        </div>}
        {displayPopupForUpdate && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
        <PopupForUpdate popupForUpdateHandler={popupForUpdateHandler} getBookListToPopupForUpdate={getBookList} bookID={bookID} authorID={authorID}genreID={genreID}/>
        </div>}
        {displayPopupForDelete && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
            <PopupForDelete popupForDeleteHandler={popupForDeleteHandler} getBookListToPopupForDelete={getBookList} bookID={bookID}/>
        </div>}
    </div>
        
    

}

export default MyComponent;