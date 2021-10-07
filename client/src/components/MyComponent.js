import React from 'react';

const MyComponent = () => {
    const myArray = [1, 2, 3];
    const grabArray = async () => {
        try {
            const promise = await fetch("/catalog");
            const json = await promise.json();
            console.log(json);
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <div>
            <p>{myArray}</p>
        </div>
    );

}

export default MyComponent;