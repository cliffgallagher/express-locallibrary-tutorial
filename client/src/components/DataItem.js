import React, {useState} from 'react';

const DataItem = (props) => {
    return (
        <div>
            <p>{props.book_id}</p>
            <p>{props.title}</p> 
            <p>{props.author_id}</p>      
        </div>
    );
}

export default DataItem;