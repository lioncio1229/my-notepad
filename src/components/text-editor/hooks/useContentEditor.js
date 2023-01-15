import { useEffect } from "react";
import { stringToElement } from "../../../utils";
import useCurrentNote from "../../notes/hooks/useCurrentNote";
import useUpdateNote from "../../notes/hooks/useUpdateNote";

export default function useContentEditor()
{
    const {note, state, dispatch} = useCurrentNote();
    const update = useUpdateNote();

    useEffect(() => {
        if(!note) return;
        const paper = document.getElementById("paper");
        if(!paper) return;
        if (paper.hasChildNodes) paper.innerHTML = "";
        paper.appendChild(stringToElement(note.content));
    }, [note]);

    const saveContent = () => {
        const content = document.getElementById('paper').innerHTML;
        update({...note, content});
        // dispatch({type : 'notes/update', payload : {...note, content}});
        dispatch({type : 'textEditor/dirty', payload : false});
    }

    const unsaveContent = () => {
        dispatch({type : 'notes/update', payload : note});
        dispatch({type : 'textEditor/dirty', payload : false});
    }

    const handleOnChange = () => {
        const innerHTML = document.getElementById("paper").innerHTML;
        if(note.content !== innerHTML) dispatch({type : 'textEditor/dirty', payload : true});
        else dispatch({type : 'textEditor/dirty', payload : false});
    }

    return {saveContent, unsaveContent, handleOnChange, isDirty : state.textEditor.isDirty};
}