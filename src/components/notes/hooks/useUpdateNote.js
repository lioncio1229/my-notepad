import useStore from "../../../useStore";
import axios from 'axios';
import { today } from "../../../utils";
import config from '../../../config.json';

export default function useUpdateNote()
{
    const {dispatch} = useStore();

    const update = (note) => {
        const _note = {...note, isFresh : false, lastModified : today()};
        dispatch({type : 'global/isLoading', payload : true});

        const url = config[process.env.NODE_ENV].api.notes
        axios({method : 'put', url, data : _note, withCredentials : true}).then(result => {
            if(result.status === 200)
                dispatch({type : 'notes/update', payload : result.data});
            dispatch({type : 'global/isLoading', payload : false});
        });
    }
    return update;
}