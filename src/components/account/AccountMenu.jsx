import React, {useState} from "react";
import axios from "axios";
import config from '../../config.json';
import { useGoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import ConfirmationBox from "../confirmation-box";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import useStore from "../../useStore";

const AccountMenu = React.forwardRef((props, ref) => {
    const {dispatch} = useStore();
    const [isSignoutBoxEnabled, setIsSignoutBoxEnabled] = useState(false);

    const {signOut} = useGoogleLogout({
        clientId : process.env.REACT_APP_CLIENT_ID,
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
        const url = config[process.env.NODE_ENV].api.user + '/logout';
        axios({method : 'post', url, withCredentials : true}).then(result => {
            if(result.status === 200) signOut();
        });
    }

    return (
        <>
            {isSignoutBoxEnabled && <ConfirmationBox
                title="Signout"
                message="Are you sure to signout?"
                icon={faSignOut}
                onConfirm={logout}
                onClose={() => setIsSignoutBoxEnabled(false)}
            />}
            
            <div className="account-menu selectable" ref={ref}>
                <p className="btn" onClick={() => setIsSignoutBoxEnabled(true)}> Logout </p>
                <div className="vertical-divider"></div>
            </div>
        </>
    );
});

export default AccountMenu;
