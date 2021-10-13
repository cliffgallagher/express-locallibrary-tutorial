import React, { useEffect, useState } from 'react';

const BookForm = (props) => {
    console.log("BookForm rendered");
    const [authorOptions, setAuthorOptions] = useState();

    const getAuthorsFromDatabase = async () => {
        const authorsResponse = await fetch('/catalog/authors');
        const authorObjectArray = await authorsResponse.json();
        // console.log(authorObjectArray);
        // const testArray = authorObjectArray.map(element => new String(element.first_name));
        // console.log(testArray);
        setAuthorOptions(() => {
            return authorObjectArray.map(element => <option key={element.author_id} value={element.author_id}>{element.family_name + ", " + element.first_name}</option>);
        })     
    }

    //getAuthorsFromDatabase();

    const options = [
        {
            key: 0,
            text: "Select One",
            value: ""
        },
        {
            key: 1,
            text: "Herman Melville",
            value: "1"
        }, {
            key: 2,
            text: "James Joyce",
            value: "2"
        }, {
            key: 3,
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
        getAuthorsFromDatabase();
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