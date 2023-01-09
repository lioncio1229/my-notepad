import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faArrowLeft,
  faArrowRight,
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter
} from "@fortawesome/free-solid-svg-icons";

// import Picker from 'emoji-picker-react';

import { useEffect, useRef } from "react";
import useCurrentNote from "../notes/hooks/useCurrentNote";
import useTitleHandler from "./hooks/useTitleHandler";
import useContentEditor from "./hooks/useContentEditor";
import ContentReader from "./contentReader";
import NoteInfo from "./noteInfo";

export default function TextEditor() {

  const {note, state, dispatch} = useCurrentNote();
  const {isTextEditorOpen} = state.global;
  const {isWide, isFullscreen} = state.textEditor.display;
  const {title, onFocus, handleFocusIn, handleFocusOut, handleTextChange} = useTitleHandler();
  const {saveContent, handleOnChange, isDirty} = useContentEditor();

  const titleRef = useRef();
  const isFocusRef = useRef();
  isFocusRef.current = onFocus;

  const handleEnter = (e) => {
    if(e.key === 'Enter' && isFocusRef.current)
      titleRef.current.blur();
  }

  useEffect(() => {
    document.addEventListener('keyup', handleEnter);
  }, [isFocusRef.current])

  useEffect(() => {
    if (note?.isFresh) titleRef.current?.focus();
  }, [note]);

  if(!note)
  {
    return (
      <div className="text-editor">
        <div className="empty">No Selected</div>
      </div>
    )
  }

  const renderTitle = () => {

    const setDisplay = (display) => {
      dispatch({type : 'textEditor/display/update', payload : display});
    }

    return (
      <div className="title">
        <div className="title-con flex-con">
          {!isFullscreen && (
            <div className="icon flex-con">
              <FontAwesomeIcon
                onClick={() => setDisplay({ isWide: !isWide })}
                className="selectable"
                icon={isWide ? faArrowRight : faArrowLeft}
              />
            </div>
          )}

          <div className="title-text">
            <input
              ref={titleRef}
              onFocus={handleFocusIn}
              onBlur={handleFocusOut}
              onChange={(e) => handleTextChange(e)}
              type="text"
              value={title}
            />

            <div className="icon-wrapper">
              <FontAwesomeIcon className="icon" icon={faFaceSmile} />
            </div>
          </div>

          <div className="icon flex-con">
            <FontAwesomeIcon
              onClick={() => setDisplay({ isFullscreen: !isFullscreen })}
              className="selectable"
              icon={
                isFullscreen
                  ? faDownLeftAndUpRightToCenter
                  : faUpRightAndDownLeftFromCenter
              }
            />
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="pad flex-con">
      <div className="viewport">
        <div
          id="paper"
          className="paper"
          contentEditable
          suppressContentEditableWarning
          onInput={handleOnChange}
        >
        </div>
      </div>
    </div>
    );
  };

  const renderFooter = () => {
    return (
      
      <div className="foot-con">

        <div className="text-editor-buttons">
          <NoteInfo dateCreated={note.dateCreated} lastModified={note.lastModified}/>
          {!
            isDirty && 
            <>
              <div className="horizontal-divider"></div>
              <ContentReader />
            </> 
          }
          {
            isDirty && 
            <>
              <div className="horizontal-divider"></div>
              <div className="save-btn">
                <button onClick={saveContent} className="btn-m selectable">Save</button>
              </div>
            </>
          }
        </div>
        
      </div>
    );
  };

  return (
    <div className="text-editor flex-con fcol">
      {renderTitle()}
      {renderContent()}
      {renderFooter()}
    </div>
  );
}