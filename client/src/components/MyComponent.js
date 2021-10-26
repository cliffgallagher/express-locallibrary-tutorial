import React, {useEffect, useState } from 'react';
import NewBook from './NewBook';
import BookList from './BookList';
import DataItem from './DataItem';
import PopupForUpdate from './PopupForUpdate';

const MyComponent = () => {
    const [myArray, setMyArray] = useState([]);
    const [displayPopupForUpdate, setDisplayPopupForUpdate] = useState(false);
    const [bookID, setBookID] = useState();
    const [bookToUpdate, setBookToUpdate] = useState();
    
    const getBookList = async () => {
        try {
            const promise = await fetch("/catalog");
            const arrayFromJSON = await promise.json();
            console.log("getBookList running: " + JSON.stringify(arrayFromJSON));
            //console.log(arrayFromJSON);
            setMyArray(() => {
                return arrayFromJSON.map((element) => <DataItem key={element.book_id} bookID={element.book_id} title={element.title} isbn={element.isbn} summary={element.summary} triggerPopupForUpdate={popupForUpdateHandler} recieveBookIDFromDataItem={passBookIDToPopupForUpdate} receiveBookToUpdateFromDataItem={passBookToUpdateToPopupForUpdate}/>);
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

    function passBookIDToPopupForUpdate(integer) {
        setBookID(integer);
    }

    function passBookToUpdateToPopupForUpdate(bookObject) {
        console.log("data in MyComponent: " + bookObject.book_id);
        setBookToUpdate(bookObject);
    }

    return <div>
        {!displayPopupForUpdate && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
        </div>}
        {displayPopupForUpdate && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
        <PopupForUpdate popupForUpdateHandler={popupForUpdateHandler} bookID={bookID} bookToUpdate={bookToUpdate}/>
        </div>}
    </div>
        
    

}

export default MyComponent;