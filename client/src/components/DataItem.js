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

    function updateBookButtonClickHandler(event) {
        setMouseIsPresent(false);
        props.triggerPopupForUpdate(true);
        props.recieveBookIDFromDataItem(props.bookID);
    }


    return (
        <div className='dataItem' onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            {!mouseIsPresent && <BookInfo title={props.title} isbn={props.isbn} summary={props.summary} onMouseEnter={mouseEnterHandler}/>}
            {mouseIsPresent && <div>
                <BookInfo title={props.title} isbn={props.isbn} summary={props.summary}/>
                <button onClick={updateBookButtonClickHandler}>Update Book</button><button>Delete Book</button>
            </div>}
        </div>
    );
}

export default DataItem;