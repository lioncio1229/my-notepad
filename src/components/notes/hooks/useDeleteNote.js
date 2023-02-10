import useStore from "../../../useStore";
import useAxiosSecured from "../../../useAxiosSecured";
import { endpoints } from "../../../config";

export default function useDeleteNote()
{
    const {dispatch, state} = useStore();
    const axiosSecured = useAxiosSecured();

    const deleteNote = (id) => {
        if(state.global.isGuestMode)
        {
            dispatch({type : 'notes/delete', payload : id});
            return;
        }
        
        dispatch({type : 'global/isLoading', payload : true});
        const endpoint = endpoints.notes + '/' +id;

        axiosSecured.delete(endpoint, {withCredentials : true}).then(result => {
            if(result.status === 200)
                dispatch({type : 'global/isLoading', payload : false});
            dispatch({type : 'notes/delete', payload : id});
        });
    }

    return deleteNote;
}