import React, {useReducer} from 'react';
import useCombinedReducers from 'use-combined-reducers';
import globalReducer, { initialState as globalInitialState } from '../components/globalSlice';
import { notesReducer, initialState as notesInitialState } from '../components/notes';
import { textEditorReducer, initialState as textEditorInitialState } from '../components/text-editor';

import axios from 'axios';
import { notes_url } from '../utils';
import { useEffect, useState } from "react";

export const StoreContext = React.createContext();

const Provider = React.memo(({children}) => {

    const [state, dispatch] = useCombinedReducers(
        {
            global : useReducer(globalReducer, globalInitialState),
            notes : useReducer(notesReducer, notesInitialState),
            textEditor : useReducer(textEditorReducer, textEditorInitialState)
        }
    );

    const [isDoneFetching, setIsDoneFetching] = useState(false);
    
    useEffect(() => {
        const list = {};
        dispatch({type : 'global/isLoading', payload : true});
        axios.get(notes_url).then(result => {
            if(result.status !== 200) return;

            result.data.forEach(item => {
                list[item._id] = item;
            });
            
            dispatch({type : 'notes/fetch', payload : list});
            dispatch({type : 'global/isLoading', payload : false});
            setIsDoneFetching(true);
        });
    }, [isDoneFetching]);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
});

export default Provider;