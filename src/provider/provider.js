import React, {useReducer} from 'react';
import useCombinedReducers from 'use-combined-reducers';
import { notesReducer, initialState as notesInitialState } from '../components/notes';
import { textEditorReducer, initialState as textEditorInitialState } from '../components/text-editor';

import axios from 'axios';
import { notes_url } from '../utils';
import { useEffect, useState } from "react";

export const StoreContext = React.createContext();

const Provider = React.memo(({children}) => {

    const [state, dispatch] = useCombinedReducers(
        {
            notes : useReducer(notesReducer, notesInitialState),
            textEditor : useReducer(textEditorReducer, textEditorInitialState)
        }
    );

    const [isDoneFetching, setIsDoneFetching] = useState(false);
    
    useEffect(() => {
        const list = {};
        axios.get(notes_url).then(result => {
            if(result.status !== 200) return;

            result.data.forEach(item => {
                list[item._id] = item;
            });
            
            dispatch({type : 'notes/fetch', payload : list});
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