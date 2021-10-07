import React, {useState} from 'react';

const MyComponent = () => {
    const [string, setString] = useState("");

    const getData = async () => {
        try {
            const promise = await fetch("/catalog");
            const javascriptObject = await promise.json();
            console.log(javascriptObject);
            setString(javascriptObject.toString());
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