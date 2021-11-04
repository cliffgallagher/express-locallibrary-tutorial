import React, { useState, useEffect } from 'react';

const AuthorPopupForDelete = (props) => {
    const [authorNameOnDeleteForm, setAuthorNameOnDeleteForm] = useState();
    const [authorBirthDateOnDeleteForm, setAuthorBirthDateOnDeleteForm] = useState();
    const [authorDeathDateOnDeleteForm, setAuthorDeathDateOnDeleteForm] = useState();

    
    async function getInitialValues() {
        //console.log('authorID in getInitialValues: ' + props.authorID);
        try {
            const response = await fetch(`catalog/author/${props.authorID}/delete`);
            const data = await response.json();
            //console.log(JSON.stringify(data));
            setAuthorNameOnDeleteForm(`${data[0].first_name} ${data[0].family_name}`);
            setAuthorBirthDateOnDeleteForm(`${data[0].date_of_birth.slice(5, 7)}-${data[0].date_of_birth.slice(8, 10)}-${data[0].date_of_birth.slice(0, 4)}`);
            data[0].date_of_death && setAuthorDeathDateOnDeleteForm(`${data[0].date_of_death.slice(5, 7)}-${data[0].date_of_death.slice(8, 10)}-${data[0].date_of_death.slice(0, 4)}`);
        } catch(e) {
            console.log(e);
        }
        
    }

    async function deleteAuthorFormSubmitHandler(event) {
        event.preventDefault();
        try {
            const response = await fetch(`catalog/author/${props.authorID}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(JSON.stringify(data));
            props.displayAuthorPopupForDelete(false);
            props.getAuthorList();
        } catch(e) {
            console.log("error in popupForDelete: " + e);
        }
        
    }

    useEffect(() => {
        getInitialValues();
    }, []);
    
    function popupForDeleteCloseButtonHandler() {
        props.displayAuthorPopupForDelete(false);
    }
    
    return <div className='popup'>
    <div className='popup-inner'>
        <form onSubmit={deleteAuthorFormSubmitHandler}>
            <h1>Are you sure you want to delete this author?</h1>
            <h3>Name: {authorNameOnDeleteForm}</h3>
            <h3>Date of Birth: {authorBirthDateOnDeleteForm}</h3>
            <h3>Died: {authorDeathDateOnDeleteForm}</h3>
            <button type="submit">Delete Author</button>
            <button className='close-button' onClick={popupForDeleteCloseButtonHandler}>Close</button>
        </form>
    </div>
</div>
}

export default AuthorPopupForDelete;