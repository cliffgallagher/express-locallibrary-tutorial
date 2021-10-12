import React, { useEffect, useState } from 'react';

const BookForm = (props) => {

    const [authorOptions, setAuthorOptions] = useState();

    const options = [
        {
            text: "Herman Melville",
            value: "1"
        }, {
            text: "James Joyce",
            value: "2"
        }, {
            text: "Mitch Albom",
            value: "3"
        }
    ];

    if (options != null) {
        console.log("options exists");
    }

    /*useEffect(() => {
        options.forEach(option =>
            optionsList.add(
                new Option(option.text, option.value)
            )   
    )}, []);*/

    
    useEffect(() => {
        setAuthorOptions(() => {
            return options.map(option => <option value={option.value}>{option.text}</option>);
        })
    }, [])
    

    function bookFormSubmitHandler(event) {
        event.preventDefault();
        console.log("submitted");
    }
    return <form onSubmit={bookFormSubmitHandler}>
            <label>Title<input type='text' name='titleField'/></label>
            <label>ISBN<input type='text' name='isbnField' /></label>
            <label>Summary<input type='text' name='summaryField' /></label>
            <label>Authors<select name='authors'>{authorOptions}</select></label>
            <button onClick={props.onCancel}>Cancel</button>
            <button type='submit'>Submit</button>
        </form>
}

export default BookForm;