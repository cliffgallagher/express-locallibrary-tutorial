import React, { useState } from 'react';
import BookInfo from './BookInfo';
import './DataItem.css';
import PopupForUpdate from './PopupForUpdate';

const DataItem = (props) => {
    const [mouseIsPresent, setMouseIsPresent] = useState(false);
    const [triggerStatus, setTriggerStatus] = useState(false);

    function mouseEnterHandler() {
        setMouseIsPresent(true);
    }

    function mouseLeaveHandler() {
        setMouseIsPresent(false);
    }

    function updateBookButtonClickHandler() {
        setMouseIsPresent(false);
        props.triggerPopupForUpdate(true);   
        props.receiveBookIDFromDataItem(props.bookID);
    }

    function deleteBookButtonClickHandler() {
        setMouseIsPresent(false);
        props.triggerPopupForDelete(true); 
        props.receiveBookIDFromDataItem(props.bookID);
    }

    /*async function bookObjectDataItemToMyComponent() {
        try {
            const response = await fetch(`catalog/book/${props.bookID}/update`);
            const data = await response.json();
            //console.log("bookToUpdate: " + data[0].book_id);
            props.receiveBookToUpdateFromDataItem(data[0]);
            
        } catch(e) {
            console.log(e);
        }
    }*/



    return (
        <div className='dataItem' onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            {!mouseIsPresent && <BookInfo title={props.title} isbn={props.isbn} summary={props.summary} onMouseEnter={mouseEnterHandler}/>}
            {mouseIsPresent && <div>
                <BookInfo title={props.title} isbn={props.isbn} summary={props.summary}/>
                <button onClick={updateBookButtonClickHandler}>Update Book</button><button onClick={deleteBookButtonClickHandler}>Delete Book</button>
            </div>}
        </div>
    );
}

export default DataItem;