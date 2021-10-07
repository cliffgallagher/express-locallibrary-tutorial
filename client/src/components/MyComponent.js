import React, {useState} from 'react';

const MyComponent = () => {
    const [array, setArray] = useState("");

    const getData = async () => {
        try {
            const promise = await fetch("/catalog");
            const array = await promise.text();
            console.log(array);
            setArray(array);
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
            <p>{array}</p>
        </div>
    );

}

export default MyComponent;