import useStore from "./useStore";
import config from './config.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useFetchUserData()
{
    const {dispatch} = useStore();
    const navigate = useNavigate();

    const fetch = () => {
        const list = {};
        dispatch({type : 'global/isLoading', payload : true});
        const {user : userUrl} = config[process.env.NODE_ENV].api;
        
        axios.get(userUrl, {withCredentials : true}).then(result => {
            if(result.status !== 200){
                navigate('/');
                return;
            };

            result.data.notes.forEach(item => {
                list[item._id] = item;
            });
            
            dispatch({type : 'notes/fetch', payload : list});
            dispatch({type : 'global/setAccount', payload : {picture : result.data.picture}});
            dispatch({type : 'global/setGuestMode', payload : false});
            dispatch({type : 'global/isLoading', payload : false});
        }).catch((e) => {
            dispatch({type : 'global/setGuestMode', payload : true});
            dispatch({type : 'global/isLoading', payload : false});
        });
    }

    return {fetch};
}