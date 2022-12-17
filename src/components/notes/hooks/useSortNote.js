import { useEffect } from "react";
import useStore from "../../../useStore";
import { sortObject } from "../../../utils";
import { sortTypes } from "../notesSlice";

export function byTitleSort(a, b)
{
    const name1 = a.title.toLowerCase(),
          name2 = b.title.toLowerCase();

    if(name1 > name2) return 1;
    else if(name1 < name2) return -1;
    return 0;
}

export function byDateCreatedSort(a, b)
{
    return new Date(b.dateCreated) - new Date(a.dateCreated);
}

export function byLastModifiedSort(a, b)
{
    return new Date(b.lastModified) - new Date(a.lastModified);
}

export function byContentLengthSort(a, b)
{
    return  b.content.length - a.content.length;
}

export default function useSortNote()
{
    const {state, dispatch} = useStore();
    const {list, listArray, modificationID, sortType, isAscending} = state.notes;
    
    const setSortFunc = (func) =>
    {   
        let sortedList = sortObject(list, func);
        if(!isAscending) sortedList = sortedList.reverse();
        dispatch({type : 'notes/listArray', payload : sortedList});
    }

    useEffect(() => {
        switch (sortType) {

            case sortTypes.byTitle:
                setSortFunc(byTitleSort);
                break;

            case sortTypes.byDateCreated:
                setSortFunc(byDateCreatedSort);
                break;

            case sortTypes.byLastModified:
                setSortFunc(byLastModifiedSort);
                break;

            case sortTypes.byContentLength:
                setSortFunc(byContentLengthSort);
                break;
                
            default:
                setSortFunc();
                break;
        }
    }, [modificationID, sortType, isAscending]);

    return listArray;
}