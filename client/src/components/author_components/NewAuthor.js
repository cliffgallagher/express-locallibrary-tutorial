import React, { useState } from 'react';
import NewAuthorForm from './NewAuthorForm';
import DuplicateAuthorWarning from './DuplicateAuthorWarning';

const NewAuthor = (props) => {
    const [isAddingNewAuthor, setIsAddingNewAuthor] = useState(false);
    const [addingDuplicateAuthor, setAddingDuplicateAuthor] = useState(false);
    const [newAuthorInfoForWarning, setNewAuthorInfoForWarning] = useState();

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
        //console.log("new author info in NewAuthor component: " + JSON.stringify(newAuthorInfo));
        props.passNewAuthorInfo(newAuthorInfo);
    }

    function getNewAuthorInfoToDuplicateWarning() {
        setNewAuthorInfoForWarning(props.newAuthorInfoForWarning);
        console.log("newAuthorInfo as props in NewAuthor: " + props.newAuthorInfoForWarning);
    }
    
    return (
        <div>
            {!isAddingNewAuthor && !addingDuplicateAuthor && <button onClick={newAuthorButtonClickHandler}>Add New Author</button>}
            {isAddingNewAuthor && <NewAuthorForm hideNewAuthorForm={hideNewAuthorForm} getAuthorList={props.getAuthorList} showDuplicateAuthorWarning={showDuplicateAuthorWarning} passNewAuthorInfo={passNewAuthorInfo}/>}
            {addingDuplicateAuthor && (
                <div>
                    {<DuplicateAuthorWarning hideDuplicateAuthorWarning={hideDuplicateAuthorWarning} showDuplicateAuthorWarning={showDuplicateAuthorWarning} passNewAuthorInfo={passNewAuthorInfo} newAuthorInfoForWarning={props.newAuthorInfoForWarning}/>}
                </div>
            )}
        </div>
    )
}

export default NewAuthor;