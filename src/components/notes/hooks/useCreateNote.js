import useStore from "../../../useStore";
import axios from 'axios';
import config from '../../../config.json';

export default function useCreateNote()
{
    const {dispatch, state} = useStore();
    const newNote = {
        title : 'New Note',
        content : '',
        isFresh : true
    }
    const create = () => {
        dispatch({type : 'global/isLoading', payload : true});
        axios({method : 'post', url : config.development.api.notes, data : newNote, withCredentials : true}).then(result => {
            if(result.status === 200)
                dispatch({type : 'notes/add', payload : result.data});
            dispatch({type : 'global/isLoading', payload : false});
        });
    }
    return create;
}