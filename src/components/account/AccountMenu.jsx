import React, { useState } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import ConfirmationBox from "../confirmation-box";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import useStore from "../../useStore";
import useFetchUserData from "../../useFetchUserData";
import axios from "../../api/axios";
import useAxiosSecured from "../../useAxiosSecured";
import { endpoints } from "../../config";

const AccountMenu = React.forwardRef(({toggle}, ref) => {
    const {dispatch, state} = useStore();
    const {isGuestMode} = state.global;
    const {list} = state.notes;
    const {fetch} = useFetchUserData();
    const [isCBOpen, setCB] = useState(false);
    const axiosSecured = useAxiosSecured();

    const onLogin = (res) => {
        toggle && toggle();
        dispatch({ type: "global/isLoading", payload: true });
        axios.post(
            endpoints.authentication,
            { authCode: res.code },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
        .then(_ => {
            const notes = Object.keys(list).map(key => list[key]);  //Convert notes object to array
            axiosSecured.post(endpoints.addNotes, {notes})
            .then(_ => {
                fetch();
            }).catch((e) => console.log(e.message));
        })
        .catch((e) => {
            dispatch({ type: "global/isLoading", payload: false });

            console.log(e.message);
        });
    }

    const login = useGoogleLogin({
        onSuccess: onLogin,
        onError(){
            console.error("Can't login");
        },
        flow: 'auth-code',
        redirect_uri: 'postmessage'
    });

    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: "global/isLoading", payload: true });
        axiosSecured.post(endpoints.logout).then(result => {
            if(result.status === 200) {
                googleLogout();
                dispatch({type : 'notes/setEmpty'});
                dispatch({type : 'global/setGuestMode', payload : false});
                dispatch({ type: "global/isLoading", payload: false });
                navigate('/');
            }
        })
        .catch(e => dispatch({ type: "global/isLoading", payload: false }));
    }

    if(isGuestMode)
    {
        return (
            <div className="account-menu selectable" ref={ref}>
                <p className="btn" onClick={() => login()}> Signin </p>
                <div className="vertical-divider"></div>
            </div>
        );
    };

    return (
        <>
            {isCBOpen && <ConfirmationBox
                title="Signout"
                message="Are you sure to signout?"
                icon={faSignOut}
                onConfirm={logout}
                onClose={() => setCB(false)}
            />}
            
            <div className="account-menu selectable" ref={ref}>
                <p className="btn" onClick={() => setCB(true)}> Logout </p>
                <div className="vertical-divider"></div>
            </div>
        </>
    );
});

export default AccountMenu;
