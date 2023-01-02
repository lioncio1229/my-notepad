import React, {useReducer} from 'react';
import { useEffect } from 'react';
import useCombinedReducers from 'use-combined-reducers';
import globalReducer, { initialState as globalInitialState } from '../components/globalSlice';
import { notesReducer, initialState as notesInitialState } from '../components/notes';
import { textEditorReducer, initialState as textEditorInitialState } from '../components/text-editor';
import config from '../config.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const StoreContext = React.createContext();

const Provider = React.memo(({children}) => {
    const navigate = useNavigate();
    const [state, dispatch] = useCombinedReducers(
        {
            global : useReducer(globalReducer, globalInitialState),
            notes : useReducer(notesReducer, notesInitialState),
            textEditor : useReducer(textEditorReducer, textEditorInitialState)
        }
    );
    
    useEffect(() => {
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
            
            dispatch({type : 'global/setAccount', payload : {picture : result.data.picture}});
            dispatch({type : 'notes/fetch', payload : list});
            dispatch({type : 'global/isLoading', payload : false});
        }).catch((e) => {
            navigate('/');
        });
    }, []);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
});

export default Provider;