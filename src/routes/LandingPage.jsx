import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useGoogleLogin } from '@react-oauth/google';

import axios from '../api/axios'
import { endpoints } from "../config";
import { useNavigate } from "react-router-dom";
import useStore from "../useStore";
import useRefreshToken from "../useRefreshToken";
import LoadingCircle from "../components/loading-circle";

const LandingPage = () => {
    const {dispatch} = useStore();
    const refreshToken = useRefreshToken();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type : 'notes/setEmpty'});
        dispatch({type : 'global/setAccount', payload : {picture : undefined}});
    }, []);
    
    useEffect(() => {
        dispatch({type : 'global/isLoading', payload : true});
        refreshToken().then(res => {
            dispatch({type : 'global/isLoading', payload : false});
            res && navigate('/textEditor');
        })
        .catch(e => dispatch({type : 'global/isLoading', payload : false}));
    }, []);

    const onLogin = (res) => {
        dispatch({type : 'global/isLoading', payload : true});
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
          .then((result) => {
            dispatch({type : 'global/isLoading', payload : false});
            dispatch({ type: "global/setTokenId", payload: result.data });
            dispatch({ type: "global/setGuestMode", payload: false });
            navigate(`/texteditor`);
          })
          .catch(e => dispatch({type : 'global/isLoading', payload : false}));
    };

    const login = useGoogleLogin({
        onSuccess: onLogin,
        flow: 'auth-code',
        redirect_uri: 'postmessage'
    });

    return (
    <>
        <LoadingCircle/>    
        <div className="landing-page">
            <div className="animated-bg">
                <div className="text"></div>
            </div>
            <div className="content">
                <svg id="Component_6_1" data-name="Component 6 – 1" xmlns="http://www.w3.org/2000/svg" width="646" height="140.243" viewBox="0 0 646 140.243">
                    <path id="Icon_metro-file-text" data-name="Icon metro-file-text" d="M121.433,33.3a124.2,124.2,0,0,0-11.94-13.655A124.213,124.213,0,0,0,95.838,7.707c-7.063-5.18-10.49-5.779-12.453-5.779H15.455A10.969,10.969,0,0,0,4.5,12.885v118.33a10.969,10.969,0,0,0,10.956,10.956h100.8a10.969,10.969,0,0,0,10.956-10.956V45.754c0-1.963-.6-5.389-5.779-12.453ZM103.3,25.844a119.541,119.541,0,0,1,9.94,11.145H92.151V15.9A119.419,119.419,0,0,1,103.3,25.844Zm15.151,105.371a2.221,2.221,0,0,1-2.191,2.191H15.455a2.221,2.221,0,0,1-2.191-2.191V12.885a2.221,2.221,0,0,1,2.191-2.191h67.93V41.371a4.383,4.383,0,0,0,4.383,4.383h30.678ZM96.533,115.876H35.177a4.383,4.383,0,1,1,0-8.765H96.533a4.383,4.383,0,1,1,0,8.765Zm0-17.53H35.177a4.383,4.383,0,1,1,0-8.765H96.533a4.383,4.383,0,1,1,0,8.765Zm0-17.53H35.177a4.383,4.383,0,1,1,0-8.765H96.533a4.383,4.383,0,1,1,0,8.765Z" transform="translate(-4.499 -1.928)" fill="#8b842b"/>
                    <text id="MY_NOTEPAD" data-name="MY NOTEPAD" transform="translate(147.5 79.122)" fill="#8b842b" fontSize="75" fontFamily="Poppins-Bold, Poppins" fontWeight="700"><tspan x="0" y="0">MY NOTEPAD</tspan></text>
                    <rect id="Rectangle_20" data-name="Rectangle 20" width="505" height="42" transform="translate(141 93.122)" fill="#8b842b"/>
                    <text id="My_text_editor_for_web" data-name="My text editor for web" transform="translate(248 123.122)" fill="#fff78b" fontSize="27" fontFamily="Poppins-Medium, Poppins" fontWeight="500"><tspan x="0" y="0">My text editor for web</tspan></text>
                    <rect id="Rectangle_21" data-name="Rectangle 21" width="505" height="18" transform="translate(141 0.122)" fill="#8b842b"/>
                </svg>
            </div>
            <div className="flex-con fcol">
                <button className="lp-btn btn-xl selectable" onClick={() => login()}>
                    <img className="icon" src="./google-logo.png" alt="google-logo.png" width={30} height={'auto'} />
                    <p> Continue with Google Account </p>
                </button>
                <button className="lp-btn btn-xl selectable" onClick={() => navigate("/texteditor")}>
                    <FontAwesomeIcon className="icon" icon={faUser} />
                    <p> Continue as a guest </p>
                </button>
            </div>
        </div>
    </>);
}
 
export default LandingPage;
