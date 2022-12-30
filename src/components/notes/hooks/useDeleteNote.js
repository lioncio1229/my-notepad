import useStore from "../../../useStore";
import axios from 'axios';
import config from '../../../config.json';

export default function useDeleteNote()
{
    const {dispatch} = useStore();

    const deleteNote = (id) => {
        dispatch({type : 'global/isLoading', payload : true});
        const newUrl = config.development.api.notes + '/' +id;
        axios({method : 'delete', url : newUrl, withCredentials : true}).then(result => {
            if(result.status === 200)
                dispatch({type : 'global/isLoading', payload : false});
            dispatch({type : 'notes/delete', payload : id});
        });
    }

    return deleteNote;
}