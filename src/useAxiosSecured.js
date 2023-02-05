import { axiosSecured } from "./api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useTokenId from "./useTokenId";

const useAxiosSecured = () => {
    const refresh = useRefreshToken();
    const tokenId = useTokenId();

    useEffect(() => {

        const requestIntercept = axiosSecured.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${tokenId}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosSecured.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (!prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newTokenId = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newTokenId}`;
                    return axiosSecured(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecured.interceptors.request.eject(requestIntercept);
            axiosSecured.interceptors.response.eject(responseIntercept);
        }
    }, [tokenId, refresh]);

    return axiosSecured;
}

export default useAxiosSecured;