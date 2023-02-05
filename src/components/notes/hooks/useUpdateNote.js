import useStore from "../../../useStore";
import { today } from "../../../utils";
import config from '../../../config.json';
import useAxiosSecured from "../../../useAxiosSecured";
import { endpoints } from "../../../config";

export default function useUpdateNote()
{
    const {dispatch, state} = useStore();
    const axiosSecured = useAxiosSecured();

    const update = (note) => {
        const _note = {...note, isFresh : false, lastModified : today()};
        if(state.global.isGuestMode)
        {
            dispatch({type : 'notes/update', payload : _note});
            return;
        }

        dispatch({type : 'global/isLoading', payload : true});
        axiosSecured.put(endpoints.notes, _note, {withCredentials : true}).then(result => {
            if(result.status === 200)
                dispatch({type : 'notes/update', payload : result.data});
            dispatch({type : 'global/isLoading', payload : false});
        });
    }
    return update;
}