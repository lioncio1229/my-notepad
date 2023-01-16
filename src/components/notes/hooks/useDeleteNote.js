import useStore from "../../../useStore";
import axios from 'axios';
import config from '../../../config.json';

export default function useDeleteNote()
{
    const {dispatch, state} = useStore();

    const deleteNote = (id) => {
        if(state.global.isGuestMode)
        {
            dispatch({type : 'notes/delete', payload : id});
            return;
        }
        
        dispatch({type : 'global/isLoading', payload : true});
        const url = config[process.env.NODE_ENV].api.notes + '/' +id;

        axios({method : 'delete', url, withCredentials : true}).then(result => {
            if(result.status === 200)
                dispatch({type : 'global/isLoading', payload : false});
            dispatch({type : 'notes/delete', payload : id});
        });
    }

    return deleteNote;
}