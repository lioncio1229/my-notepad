export const stringToElement = (nodeString) => {
    return document.createRange().createContextualFragment(nodeString);
}

export const notes_url = 'https://my-notepad-api.onrender.com/notes';

export function today()
{
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

/**
 * 
 * @param {*} obj The object to be sort
 * @param {*} sortFunc Javascript Sort function (optional)
 * @returns Array version of the object
 */
 export function sortObject(obj, sortFunc)
 {
     const arrVersion = Object.keys(obj).map(key => obj[key]);
     if(sortFunc)
         return arrVersion.sort(sortFunc)
     return arrVersion;
 }