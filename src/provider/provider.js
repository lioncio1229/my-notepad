import React, {useReducer} from 'react';
import useCombinedReducers from 'use-combined-reducers';
import globalReducer, { initialState as globalInitialState } from '../components/globalSlice';
import { notesReducer, initialState as notesInitialState } from '../components/notes';
import { textEditorReducer, initialState as textEditorInitialState } from '../components/text-editor';


export const StoreContext = React.createContext();

const Provider = React.memo(({children}) => {

    const [state, dispatch] = useCombinedReducers(
        {
            global : useReducer(globalReducer, globalInitialState),
            notes : useReducer(notesReducer, notesInitialState),
            textEditor : useReducer(textEditorReducer, textEditorInitialState)
        }
    );

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
});

export default Provider;