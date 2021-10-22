import React, { useState } from 'react';
import BookInfo from './BookInfo';
import './DataItem.css';

const DataItem = (props) => {
    const [mouseIsPresent, setMouseIsPresent] = useState(false);

    function mouseEnterHandler() {
        console.log("entered mouse enter handler");
        setMouseIsPresent(true);
    }

    return (
        <div className='dataItem'>
            {!mouseIsPresent && <BookInfo title={props.title} isbn={props.isbn} summary={props.summary} onMouseEnter={mouseEnterHandler}/>}
            {mouseIsPresent && <div>
                <BookInfo title={props.title} isbn={props.isbn} summary={props.summary}/>
                <button>Update Book</button><button>Delete Book</button>
            </div>}
        </div>
    );
}

export default DataItem;