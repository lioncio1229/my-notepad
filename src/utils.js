export const stringToElement = (nodeString) => {
    return document.createRange().createContextualFragment(nodeString);
}

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

 export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);