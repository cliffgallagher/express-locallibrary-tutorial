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
    
    const getBookList = async (controller) => {
        try {
            const promise = await fetch("/catalog", {
                signal: controller.signal
            });
            const arrayFromJSON = await promise.json();
            console.log("getBookList in MyComponent retrieved this list from MySQL: " + JSON.stringify(arrayFromJSON));
            //console.log(arrayFromJSON);
            setMyArray(() => {
                return arrayFromJSON.map((element) => <DataItem key={element.book_id} bookID={element.book_id} title={element.title} isbn={element.isbn} summary={element.summary} triggerPopupForUpdate={popupForUpdateHandler} receiveBookToUpdateFromDataItem={passBookToUpdateToPopupForUpdate}/>);
            });
            controller = null;
            return controller;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        let controller = new AbortController();
        getBookList(controller);
        return () => controller?.abort();
    }, []);


    /*const printUserInfo = (userInfo) => {
        console.log("userInfo at MyComponent level: " + JSON.stringify(userInfo));
    }*/

    function popupForUpdateHandler(boolean) {
        setDisplayPopupForUpdate(boolean);
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
        <PopupForUpdate popupForUpdateHandler={popupForUpdateHandler} bookToUpdate={bookToUpdate}/>
        </div>}
    </div>
        
    

}

export default MyComponent;