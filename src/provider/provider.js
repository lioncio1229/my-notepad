import React, {useReducer} from 'react';
import { useEffect } from 'react';
import useCombinedReducers from 'use-combined-reducers';
import globalReducer, { initialState as globalInitialState } from '../components/globalSlice';
import { notesReducer, initialState as notesInitialState } from '../components/notes';
import { textEditorReducer, initialState as textEditorInitialState } from '../components/text-editor';
import config from '../config.json';
import axios from 'axios';

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
        const list = {};
        dispatch({type : 'global/isLoading', payload : true});
        const url = config[process.env.NODE_ENV].api.notes;
        
        axios.get(url, {withCredentials : true}).then(result => {
            if(result.status !== 200){

                return;
            };
    
            result.data.forEach(item => {
                list[item._id] = item;
            });
            
            dispatch({type : 'notes/fetch', payload : list});
            dispatch({type : 'global/isLoading', payload : false});
        });
    }, []);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
});

export default Provider;