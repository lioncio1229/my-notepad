import useStore from "../../../useStore";
import axios from 'axios';
import { notes_url, today } from "../../../utils";

export default function useUpdateNote()
{
    const {dispatch} = useStore();

    const update = (note) => {
        const _note = {...note, isFresh : false, lastModified : today()};
        dispatch({type : 'global/isLoading', payload : true});
        axios.put(notes_url, _note).then(result => {
            if(result.status === 200)
            {
                dispatch({type : 'notes/update', payload : result.data});
                dispatch({type : 'global/isLoading', payload : false});
            }
        });
    }
    return update;
}