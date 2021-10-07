import React, {useState} from 'react';

const MyComponent = () => {
    const [string, setString] = useState("");

    const getData = async () => {
        try {
            const promise = await fetch("/catalog");
            const stringFromJSON = await promise.text();
            setString(stringFromJSON);
            /*for (item in array) {
                for (attribute in object) {
                    setArray((prevState) => {
                        return [...prevState, object[attribute]];
                    });
                }
            }*/
        } catch (e) {
            console.log(e);
        }
    }

    getData();

    return(
        <div>
            <p>{string}</p>
        </div>
    );

}

export default MyComponent;