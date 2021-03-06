import React, { useState } from 'react';
import NewAuthorForm from './NewAuthorForm';
import DuplicateAuthorWarning from './DuplicateAuthorWarning';
import styles from '../NewElement.module.css';

const NewAuthor = (props) => {
    const [isAddingNewAuthor, setIsAddingNewAuthor] = useState(false);
    const [addingDuplicateAuthor, setAddingDuplicateAuthor] = useState(false);
    const [newAuthorInfoState, setNewAuthorInfoState] = useState();

    function newAuthorButtonClickHandler() {
        setIsAddingNewAuthor(true);
    }

    function hideNewAuthorForm() {
        setIsAddingNewAuthor(false);
    }

    function showDuplicateAuthorWarning() {
        setAddingDuplicateAuthor(true);
    }

    function hideDuplicateAuthorWarning() {
        setAddingDuplicateAuthor(false);
    }

    function passNewAuthorInfo(newAuthorInfo) {
        setNewAuthorInfoState(newAuthorInfo);
    }
    
    return (
        <div>
            {!isAddingNewAuthor && !addingDuplicateAuthor && <div id={styles.addElementButtonContainer}><button id={styles.addElementButton} onClick={newAuthorButtonClickHandler}>Add New Author</button></div>}
            {isAddingNewAuthor && <NewAuthorForm hideNewAuthorForm={hideNewAuthorForm} getAuthorList={props.getAuthorList} showDuplicateAuthorWarning={showDuplicateAuthorWarning} passNewAuthorInfo={passNewAuthorInfo}/>}
            {addingDuplicateAuthor && (
                <div>
                    {<DuplicateAuthorWarning hideDuplicateAuthorWarning={hideDuplicateAuthorWarning} showDuplicateAuthorWarning={showDuplicateAuthorWarning} newAuthorInfoForWarning={newAuthorInfoState} getAuthorList={props.getAuthorList} hideNewAuthorForm={hideNewAuthorForm}/>}
                </div>
            )}
        </div>
    )
}

export default NewAuthor;