import React from "react";
import styles from '../ElementInfo.module.css';

const AuthorInfo = (props) => {
    //console.log('name: ' + props.firstName + ' ' + props.familyName + ', props.dateOfBirth: ' + props.dateOfBirth);
    return (
        <div data-cy='author_info'>
            <p data-cy='author_info_name_field'>{`${props.familyName}, ${props.firstName}`}</p>
            <p data-cy='author_info_birth_date'>Born: {`${props.dateOfBirth.slice(5, 7)}-${props.dateOfBirth.slice(8, 10)}-${props.dateOfBirth.slice(0, 4)}`}</p>
            <p data-cy='author_info_death_date'>Died: {props.dateOfDeath && `${props.dateOfDeath.slice(5, 7)}-${props.dateOfDeath.slice(8, 10)}-${props.dateOfDeath.slice(0, 4)}`}</p>
        </div>
    )
}

export default AuthorInfo;