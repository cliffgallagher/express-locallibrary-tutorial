import React from "react";
import '../Popup.css';

const DuplicateAuthorWarning = (props) => {
    console.log("info in dup author warning: " + JSON.stringify(props.newAuthorInfoForWarning));

    async function duplicateAuthorWarningSubmitHandler(event) {
        event.preventDefault();
        await fetch(`catalog/author/create/two`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.newAuthorInfoForWarning)
        });
        props.hideDuplicateAuthorWarning();
        props.getAuthorList();
    }
    
    function hideDuplicateAuthorWarning() {
        props.hideDuplicateAuthorWarning();
    }
    
    return (
        <div className='popup'>
            <div className='popup-inner'>
                <form onSubmit={duplicateAuthorWarningSubmitHandler}>
                    <p>An author named {`${props.newAuthorInfoForWarning.first_name} ${props.newAuthorInfoForWarning.family_name}`} is already in the database.</p>
                    <p>Do you still wish to create this author?</p>
                    <button type="submit">Yes</button>
                    <button className='close-button' onClick={hideDuplicateAuthorWarning}>No</button>
                </form>
            </div>
        </div>
    )
}

export default DuplicateAuthorWarning;