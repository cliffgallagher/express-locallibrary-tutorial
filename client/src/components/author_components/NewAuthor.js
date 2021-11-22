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
        console.log("newAuthorInfo in NewAuthor: " + JSON.stringify(newAuthorInfo));
        //console.log("new author info in NewAuthor component: " + JSON.stringify(newAuthorInfo));
        //props.passNewAuthorInfo(newAuthorInfo);
    }
    
    return (
        <div>
            {!isAddingNewAuthor && !addingDuplicateAuthor && <div id={styles.addElementButtonContainer}><button id={styles.addElementButton} onClick={newAuthorButtonClickHandler}>Add New Author</button></div>}
            {isAddingNewAuthor && <NewAuthorForm hideNewAuthorForm={hideNewAuthorForm} getAuthorList={props.getAuthorList} showDuplicateAuthorWarning={showDuplicateAuthorWarning} passNewAuthorInfo={passNewAuthorInfo}/>}
            {addingDuplicateAuthor && (
                <div>
                    {<DuplicateAuthorWarning hideDuplicateAuthorWarning={hideDuplicateAuthorWarning} showDuplicateAuthorWarning={showDuplicateAuthorWarning} newAuthorInfoForWarning={newAuthorInfoState} getAuthorList={props.getAuthorList}/>}
                </div>
            )}
        </div>
    )
}

export default NewAuthor;