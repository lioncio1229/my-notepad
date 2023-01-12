import { useState, useEffect } from "react";
import "../style.css";
import "../style.mobile.css";
import useStore from "../useStore";
import Header from "../components/header";
import Notes from "../components/notes";
import TextEditor from "../components/text-editor";
import LoadingCircle from "../components/loading-circle";
import useFetchUserData from "../useFetchUserData";
import useCreateNote from '../components/notes/hooks/useCreateNote';
import ConfirmationBox from "../components/confirmation-box/confirmationBox";
import useDeleteNote from "../components/notes/hooks/useDeleteNote";
import useSortNote from "../components/notes/hooks/useSortNote";
import useContentEditor from "../components/text-editor/hooks/useContentEditor";
import { isMobile } from "../utils";

import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

export default function Main() {
  const {state, dispatch} = useStore();
  const {list, currentId} = state.notes;
  const note = list[currentId];
  const { picture } = state.global.account;
  const { isTextEditorOpen } = state.global;
  const { isWide, isLong, isFullscreen } = state.textEditor.display;
  const { fetch } = useFetchUserData();

  const createNote = useCreateNote();

  const { isDirty, saveContent, unsaveContent } = useContentEditor();
  const [saveCB, setSaveCB] = useState({ id: undefined, isOn: false });
  const [deleteCB, setDeleteCB] = useState({ id: undefined, isOn: false });
  const deleteNote = useDeleteNote();

  const notes = useSortNote();

  useEffect(() => {
    fetch();
  }, []);

  const select = (id) => {
    dispatch({ type: "notes/select", payload: id });
  };

  const isNoteDirty = (id) => {
    const { currentId } = state.notes;

    if (state.textEditor.isReading)
      dispatch({ type: "textEditor/reading", payload: false });

    if (isDirty && !id) {
      setSaveCB({ id: currentId, isOn: true });
      return true;
    }
    if (isDirty && currentId !== id) {
      setSaveCB({ id, isOn: true });
      return true;
    }
    return false;
  };

  const handleAddNote = () => {
    if (!isNoteDirty()) createNote();
  };

  const handleNoteClick = (id) => {
    if (!isNoteDirty(id)) {
      select(id);
      if (isMobile) dispatch({ type: "global/TextEditorOpen", payload: true });
    }
  };

  const handleNoteDelete = (id) => {
    if (!isNoteDirty(id)) setDeleteCB({ id, isOn: true });
  };

  const setDisplay = (display) => {
    dispatch({type : 'textEditor/display/update', payload : display});
  }

  const closeTextEditor = (force=false) => {
    if(!force && isNoteDirty()) return; 
    dispatch({type : 'global/TextEditorOpen', payload : false})
  }

  const saveConfirmationBox = () => {
    const saveNote = () => {
      saveContent();
      select(saveCB.id);
      isMobile && closeTextEditor(true);
    };

    const unsaveNote = () => {
      unsaveContent();
      select(saveCB.id);
      isMobile && closeTextEditor(true);
    };

    return (
      <ConfirmationBox
        title="Save"
        message="Do you want to save this first?"
        icon={faSave}
        onConfirm={saveNote}
        onDeny={unsaveNote}
        onClose={() => setSaveCB({ id: undefined, isOn: false })}
      />
    );
  };

  const deleteConfirmationBox = () => {
    const cbDeleteNote = () => {
      dispatch({ type: "textEditor/dirty", payload: false });
      deleteNote(deleteCB.id);
    };

    return (
      <ConfirmationBox
        title="Delete"
        message="Do you want to delete this?"
        icon={faTrash}
        onConfirm={cbDeleteNote}
        onDeny={() => setDeleteCB({ id: undefined, isOn: false })}
        onClose={() => setDeleteCB({ id: undefined, isOn: false })}
      />
    );
  };

  return (
    <>
      {saveCB.isOn && saveConfirmationBox()}
      {deleteCB.isOn && deleteConfirmationBox()}
      <LoadingCircle />

      <div className="main flex-con fcol">
        {isMobile ? (
          <>

            {!isTextEditorOpen ? (
              <>
                <Header picture={picture} />
                <Notes
                  notes={notes}
                  onAddNote={handleAddNote}
                  onDeleteNote={handleNoteDelete}
                  onClickNote={handleNoteClick}
                />
              </>
            ) : (
              <TextEditor
                note={note}
                setDisplay={setDisplay}
                isWide={isWide}
                isFullscreen={isFullscreen}
                closeTextEditor={closeTextEditor}
                isMobile={isMobile}
              />
            )}
          </>
        ) : (
          <>
            {!isLong && !isFullscreen && <Header picture={picture} />}
            <div className="my-notepad flex-con">
              {!isWide && !isFullscreen && (
                <Notes
                  notes={notes}
                  onAddNote={handleAddNote}
                  onDeleteNote={handleNoteDelete}
                  onClickNote={handleNoteClick}
                />
              )}
              <TextEditor
                note={note}
                setDisplay={setDisplay}
                isWide={isWide}
                isFullscreen={isFullscreen}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
