import React, {useEffect, useReducer} from 'react';
import useCombinedReducers from 'use-combined-reducers';
import globalReducer, { initialState as globalInitialState } from '../components/globalSlice';
import { notesReducer, initialState as notesInitialState } from '../components/notes';
import { textEditorReducer, initialState as textEditorInitialState } from '../components/text-editor';
import { gapi } from "gapi-script";

export const StoreContext = React.createContext();

const Provider = React.memo(({children}) => {

    const [state, dispatch] = useCombinedReducers(
        {
            global : useReducer(globalReducer, globalInitialState),
            notes : useReducer(notesReducer, notesInitialState),
            textEditor : useReducer(textEditorReducer, textEditorInitialState)
        }
    );

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
              clientId: process.env.REACT_APP_CLIENT_ID,
              scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
            });
          };
        gapi.load('client:auth2', initClient);
    });

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
});

export default Provider;