import useStore from "../../../useStore";
import axios from 'axios';
import { notes_url } from "../../../utils";

export default function useDeleteNote()
{
    const {dispatch} = useStore();

    const deleteNote = (id) => {
        dispatch({type : 'global/isLoading', payload : true});
        const newUrl = notes_url + '/' +id;
        axios.delete(newUrl).then(result => {
            if(result.status === 200)
                dispatch({type : 'global/isLoading', payload : false});
            dispatch({type : 'notes/delete', payload : id});
        });
    }

    return deleteNote;
}