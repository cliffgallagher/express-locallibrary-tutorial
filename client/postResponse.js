const fetchAsPost = async () => {
    try {
        const response = await fetch('https://handlers.education.launchcode.org/request-parrot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    title: "Test Title",
                    author_id: 4,
                    summary: "Test Summary",
                    isbn: "Test ISBN",
                    genre_id: 3
                })
        });
    } catch (e) {
        console.log(e);
    }
}

fetchAsPost();