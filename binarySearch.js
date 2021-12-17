/*
arr is the array you're searching, l is begininning index (0), r is ending index, x is value you're searching for, k is name of object keys you are searching (as string)
*/

function binarySearchBookObjects(arr, l, r, x, k){

    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);

        // If the element is present at the middle
        // itself
        if (arr[mid][k].toLowerCase() === x.toLowerCase())
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

/*
arr is the array you're searching, l is begininning index (0), r is ending index
*/
function binarySearchAuthorObjects(arr, l, r, lastNameSearchingFor, firstNameSearchingFor){

    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
        // If the element is present at the middle
        // itself
        if (arr[mid].family_name.toLowerCase() === lastNameSearchingFor.toLowerCase()) {
            if (arr[mid]["first_name"].toLowerCase() === firstNameSearchingFor.toLowerCase()) {
                return mid;
            } else {
                if (arr[mid]["first_name"].toLowerCase() > firstNameSearchingFor.toLowerCase()) {
                    return binarySearchAuthorObjects(arr, l, mid - 1, lastNameSearchingFor, firstNameSearchingFor);
                } else {
                    return binarySearchAuthorObjects(arr, mid + 1, r, lastNameSearchingFor, firstNameSearchingFor);
                }
            }
        }

        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid]["family_name"].toLowerCase() > lastNameSearchingFor.toLowerCase()) {
            return binarySearchAuthorObjects(arr, l, mid - 1, lastNameSearchingFor, firstNameSearchingFor);
        }

 
        // Else the element can only be present
        // in right subarray
        return binarySearchAuthorObjects(arr, mid + 1, r, lastNameSearchingFor, firstNameSearchingFor);
    }
 
    // We reach here when element is not
    // present in array
    return -1;
}

module.exports = {
    binarySearchBookObjects: binarySearchBookObjects,
    binarySearchAuthorObjects: binarySearchAuthorObjects
}