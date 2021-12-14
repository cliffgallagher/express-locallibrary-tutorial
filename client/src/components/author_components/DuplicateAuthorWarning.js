import React, { useContext } from "react";
import styles from '../Popup.module.css';
import { AuthContext } from "../../context/auth-context";

const DuplicateAuthorWarning = (props) => {
    const auth = useContext(AuthContext);
    //console.log("info in dup author warning: " + JSON.stringify(props.newAuthorInfoForWarning));

    async function duplicateAuthorWarningSubmitHandler(event) {
        event.preventDefault();
        await fetch(`catalog/author/create/two`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(props.newAuthorInfoForWarning)
        });
        props.hideDuplicateAuthorWarning();
        props.hideNewAuthorForm();
        props.getAuthorList();
    }
    
    function hideDuplicateAuthorWarning() {
        props.hideDuplicateAuthorWarning();
    }
    
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <form onSubmit={duplicateAuthorWarningSubmitHandler}>
                    <p>An author named {`${props.newAuthorInfoForWarning.first_name} ${props.newAuthorInfoForWarning.family_name}`} is already in the database.</p>
                    <p>Do you still wish to create this author?</p>
                    <div id={styles.button_div}>
                        <button type="submit">Yes</button>
                        <button className='close-button' id={styles.right_most_button} onClick={hideDuplicateAuthorWarning}>No</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default DuplicateAuthorWarning;