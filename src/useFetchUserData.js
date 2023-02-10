import useStore from "./useStore";
import { endpoints } from "./config";
import useAxiosSecured from "./useAxiosSecured";

export default function useFetchUserData()
{
    const {dispatch} = useStore();
    const axiosSecured = useAxiosSecured();

    const fetch = () => {
        const list = {};
        dispatch({type : 'global/isLoading', payload : true});

        axiosSecured.get(endpoints.user).then((result) => {
            result.data.notes.forEach((item) => {
              list[item._id] = item;
            });

            dispatch({ type: "notes/fetch", payload: list });
            dispatch({
              type: "global/setAccount",
              payload: { picture: result.data.picture },
            });
            dispatch({ type: "global/setGuestMode", payload: false });
            dispatch({ type: "global/isLoading", payload: false });
          })
          .catch((e) => {
            dispatch({ type: "global/setGuestMode", payload: true });
            dispatch({ type: "global/isLoading", payload: false });
          });
    }

    return {fetch};
}