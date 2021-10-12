import React, {useState} from 'react';
import './DataItem.css';

const DataItem = (props) => {
    return (
        <div className='dataItem'>
            <p>{props.key}</p><p>{props.title}</p><p>{props.isbn}</p><p>{props.summary}</p>      
        </div>
    );
}

export default DataItem;