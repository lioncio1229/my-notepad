import React, { useState } from "react";
import axios from "axios";
import config from '../../config.json';
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import ConfirmationBox from "../confirmation-box";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import useStore from "../../useStore";
import useFetchUserData from "../../useFetchUserData";


const AccountMenu = React.forwardRef(({toggle}, ref) => {
    const {dispatch, state} = useStore();
    const {isGuestMode} = state.global;
    const {list} = state.notes;
    const {fetch} = useFetchUserData();
    const [isCBOpen, setCB] = useState(false);
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const apiUrl = config[process.env.NODE_ENV].api;

    const {signIn} = useGoogleLogin({
        clientId,

        onSuccess(res){
            toggle && toggle();

            axios({
              method: "post",
              url: apiUrl.googleOAuth,
              data: { token: res.tokenId },
              withCredentials: true,
            })
            .then((_) => {
                const notes = Object.keys(list).map(key => list[key]);  //Convert notes object to array

                const url = apiUrl.notes + '/addnotes';
                axios({url, method : 'post', data : {notes}, withCredentials : true})
                .then(result => {
                    fetch();
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
        },

        onFailure(){
            console.error("Can't login");
        }
    });

    const {signOut} = useGoogleLogout({
        clientId,
        onLogoutSuccess(){
            dispatch({type : 'notes/setEmpty'});
            dispatch({type : 'global/setGuestMode', payload : false});
            navigate('/');
        },
        onFailure(){
            console.error("Can't logout");
        }
    });
    const navigate = useNavigate();

    const logout = () => {
        const url = apiUrl.user + '/logout';
        axios({method : 'post', url, withCredentials : true}).then(result => {
            if(result.status === 200) signOut();
        });
    }

    if(isGuestMode)
    {
        return (
            <div className="account-menu selectable" ref={ref}>
                <p className="btn" onClick={() => signIn()}> Signin </p>
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
