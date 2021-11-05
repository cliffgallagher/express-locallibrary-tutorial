

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

function binarySearchBookObjects(arr, l, r, x, k){
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
 
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

console.log(binarySearchBookObjects([{value: "titleOne"}, {value: "titleTwo"}, {value: "titleThree"}, {value: "titleFour"}], 0, 3, "titleOne", "value"));

module.exports = binarySearchBookObjects;