/*
arr is the array you're searching, l is begininning index (0), r is ending index, x is value you're searching for, k is name of object keys you are searching (as string)
*/

function binarySearchBookObjects(arr, l, r, x, k){
    /*console.log("arr is: " + arr);
    console.log("l: " + l);
    console.log("r: " + r);
    console.log("i am looking for: " + x);
    console.log("k is: " + k);*/
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
        /*console.log("mid: " + mid);
        console.log("arr[mid] is: " + arr[mid]);
        console.log("arr[mid][k] is: " + arr[mid][`${k}`]);*/
        // If the element is present at the middle
        // itself
        if (arr[mid][k] === x)
            return mid;
 
        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid][k] > x)
            return binarySearchBookObjects(arr, l, mid - 1, x, k);
 
        // Else the element can only be present
        // in right subarray
        return binarySearchBookObjects(arr, mid + 1, r, x, k);
    }
 
    // We reach here when element is not
    // present in array
    return -1;
}

/*console.log(binarySearchBookObjects([{"book_id":9,"title":"Apes and Angels","author_id":6,"summary":"Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...","isbn":"9780765379528","genre_id":2,"createdAt":"2021-10-04T23:05:46.000Z","updatedAt":"2021-10-04T23:05:46.000Z","first_name":"Ben","family_name":"Bova","name":"Science Fiction"},{"book_id":10,"title":"Death Wave","author_id":6,"summary":"In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...","isbn":"97807653795045","genre_id":3,"createdAt":"2021-10-04T23:05:46.000Z","updatedAt":"2021-11-04T14:54:44.000Z","first_name":"Ben","family_name":"Bova","name":"Poetry"},{"book_id":198,"title":"The Great American Novel","author_id":6,"summary":"I laughed, I cried.","isbn":"12345","genre_id":4,"createdAt":"2021-11-02T16:52:51.000Z","updatedAt":"2021-11-04T18:09:15.000Z","first_name":"Ben","family_name":"Bova","name":"Mystery"},{"book_id":6,"title":"The Name of the Wind (The Kingkiller Chronicle, #1)","author_id":5,"summary":"I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.","isbn":"9781473211896","genre_id":1,"createdAt":"2021-10-04T23:05:46.000Z","updatedAt":"2021-11-03T13:39:46.000Z","first_name":"Patrick","family_name":"Rothfuss","name":"Fantasyyyy"},{"book_id":8,"title":"The Slow Regard of Silent Things (Kingkiller Chronicle)","author_id":5,"summary":"Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.","isbn":"9780756411336","genre_id":1,"createdAt":"2021-10-04T23:05:46.000Z","updatedAt":"2021-10-04T23:05:46.000Z","first_name":"Patrick","family_name":"Rothfuss","name":"Fantasyyyy"},{"book_id":7,"title":"The Wise Man's Fear (The Kingkiller Chronicle, #2)","author_id":5,"summary":"Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.","isbn":"9788401352836","genre_id":1,"createdAt":"2021-10-04T23:05:46.000Z","updatedAt":"2021-10-04T23:05:46.000Z","first_name":"Patrick","family_name":"Rothfuss","name":"Fantasyyyy"},{"book_id":199,"title":"Title 6","author_id":6,"summary":"Summary 5","isbn":"ISBN 5","genre_id":4,"createdAt":"2021-11-02T20:50:45.000Z","updatedAt":"2021-11-03T14:47:30.000Z","first_name":"Ben","family_name":"Bova","name":"Mystery"}], 0, 6, "The Slow Regard of Silent Things (Kingkiller Chronicle)", "title"));*/

function binarySearchAuthorObjects(arr, l, r, x, k){
    /*console.log("arr is: " + arr);
    console.log("l: " + l);
    console.log("r: " + r);
    console.log("i am looking for: " + x);
    console.log("k is: " + k);*/
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
        /*console.log("mid: " + mid);
        console.log("arr[mid] is: " + arr[mid]);
        console.log("arr[mid][k] is: " + arr[mid][`${k}`]);*/
        // If the element is present at the middle
        // itself
        if (arr[mid][k] === x)
            return mid;
 
        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid][k] > x)
            return binarySearchBookObjects(arr, l, mid - 1, x, k);
 
        // Else the element can only be present
        // in right subarray
        return binarySearchBookObjects(arr, mid + 1, r, x, k);
    }
 
    // We reach here when element is not
    // present in array
    return -1;
}

module.exports = {
    binarySearchBookObjects: binarySearchBookObjects,
    binarySearchAuthorObjects: binarySearchAuthorObjects
}

// JavaScript program to implement recursive Binary Search
 
// A recursive binary search function. It returns
// location of x in given array arr[l..r] is present,
// otherwise -1
/*function binarySearch(arr, l, r, x){
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
 
        // If the element is present at the middle
        // itself
        if (arr[mid] == x)
            return mid;
 
        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
 
        // Else the element can only be present
        // in right subarray
        return binarySearch(arr, mid + 1, r, x);
    }
 
    // We reach here when element is not
    // present in array
    return -1;
}*/