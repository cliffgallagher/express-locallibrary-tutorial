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
    //const [bookID, setBookToUpdate] = useState();
    const [displayPopupForDelete, setDisplayPopupForDelete] = useState(false);
    
    async function getBookList() {
        try {
            const promise = await fetch("/catalog");
            const arrayFromJSON = await promise.json();
            console.log("getBookList in MyComponent retrieved this list from MySQL: " + JSON.stringify(arrayFromJSON));
            //console.log(arrayFromJSON);
            setMyArray(() => {
                return arrayFromJSON.map((element) => <DataItem key={element.book_id} bookID={element.book_id} title={element.title} isbn={element.isbn} summary={element.summary} triggerPopupForUpdate={popupForUpdateHandler} receiveBookIDFromDataItem={passBookIDToPopupForUpdate} triggerPopupForDelete={popupForDeleteHandler}/>);
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

    function passBookIDToPopupForUpdate(bookID) {
        console.log("data in MyComponent: " + bookID);
        setBookID(bookID);
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
        <PopupForUpdate popupForUpdateHandler={popupForUpdateHandler} getBookListToPopupForUpdate={getBookList} bookID={bookID}/>
        </div>}
        {displayPopupForDelete && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
            <PopupForDelete popupForDeleteHandler={popupForDeleteHandler} getBookListToPopupForDelete={getBookList} bookID={bookID}/>
        </div>}
    </div>
        
    

}

export default MyComponent;