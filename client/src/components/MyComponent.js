import React, {useEffect, useState } from 'react';
import NewBook from './NewBook';
import BookList from './BookList';
import DataItem from './DataItem';
import PopupForUpdate from './PopupForUpdate';

const MyComponent = () => {
    const [myArray, setMyArray] = useState([]);
    const [displayPopupForUpdate, setDisplayPopupForUpdate] = useState(false);
    const [bookID, setBookID] = useState();
    
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

    function passBookToUpdateToPopupForUpdate(object) {
        console.log("data in MyComponent: " + object.book_id);
    }

    return <div>
        {!displayPopupForUpdate && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
        </div>}
        {displayPopupForUpdate && <div>
            <NewBook getBookListMyComponentToNewBook={getBookList}/>
            <BookList myArray={myArray} />
        <PopupForUpdate popupForUpdateHandler={popupForUpdateHandler} bookID={bookID}/>
        </div>}
    </div>
        
    

}

export default MyComponent;