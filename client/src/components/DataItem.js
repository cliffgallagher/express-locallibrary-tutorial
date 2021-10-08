import React, {useState} from 'react';
import './DataItem.css';

const DataItem = (props) => {
    return (
        <div className='dataItem'>
            <p>{props.book_id}</p><p>{props.title}</p><p>{props.author_id}</p>      
        </div>
    );
}

export default DataItem;