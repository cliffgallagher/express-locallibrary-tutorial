import React, { useContext } from "react";
import styles from '../Popup.module.css';
import { AuthContext } from "../../context/auth-context";

const DuplicateAuthorWarning = (props) => {
    const auth = useContext(AuthContext);

    async function duplicateAuthorWarningSubmitHandler(event) {
        event.preventDefault();
        const response = await fetch(`catalog/author/create/two`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(props.newAuthorInfoForWarning)
        });
        const data = response.json();
        if (typeof data === 'object') {
            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
        }
        props.hideDuplicateAuthorWarning();
        props.hideNewAuthorForm();
        props.getAuthorList();
    }
    
    function hideDuplicateAuthorWarning() {
        props.hideDuplicateAuthorWarning();
        props.hideNewAuthorForm();
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