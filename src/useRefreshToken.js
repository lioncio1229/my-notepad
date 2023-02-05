import axios from './api/axios';
import useStore from './useStore';
import { endpoints } from './config';

const useRefreshToken = () => {
    const {dispatch} = useStore();

    const refresh = async () => {
        const response = await axios.post(endpoints.newTokenId, {
            withCredentials: true
        });
        const tokenId = response.data;
        dispatch({type : 'global/setTokenId', payload : tokenId});
        return tokenId;
    }
    return refresh;
};

export default useRefreshToken;