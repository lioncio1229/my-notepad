import useStore from "../../../useStore";
import useAxiosSecured from "../../../useAxiosSecured";
import { endpoints } from "../../../config";
import uuid from "react-uuid";

export default function useCreateNote()
{
    const {dispatch, state} = useStore();
    const axiosSecured = useAxiosSecured();

    const newNote = {
        title : 'New Note',
        content : '',
        isFresh : true,
        _id : uuid(),
    }
    const create = () => {
        if(state.global.isGuestMode)
        {
            dispatch({type : 'notes/add', payload : newNote});
            return;
        }

        dispatch({type : 'global/isLoading', payload : true});
        axiosSecured.post(endpoints.notes, newNote).then(result => {
            if(result.status === 200)
                dispatch({type : 'notes/add', payload : result.data});
            dispatch({type : 'global/isLoading', payload : false});
        });
    }
    return create;
}