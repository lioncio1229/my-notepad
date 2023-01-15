import useCurrentNote from "../notes/hooks/useCurrentNote";
import { useSpeechSynthesis } from "react-speech-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeMute,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import useToggleMenu from "./hooks/useToggleMenu";
import { isMobile } from "../../utils";

export default function ContentReader() {

  const toggleMenu = useToggleMenu();

  const { note, state, dispatch } = useCurrentNote();
  const {isReading} = state.textEditor;
  const {pitch, speed, voiceIndex} = state.textEditor.readerSettings;

  const startReading = () => {
    dispatch({type : 'textEditor/reading', payload : true});
  }
  
  const stopReading = () => {
    dispatch({type : 'textEditor/reading', payload : false});
  }

  const { speak, cancel, speaking, voices } = useSpeechSynthesis({
    onEnd: () => stopReading(),
  });

  const voice = voices[voiceIndex] || null;

  const enableReader = () => {
    speak({ text: note.content, voice, rate : speed, pitch});
    startReading();
  };

  const disableReader = () => {
    if (speaking) cancel();
    stopReading();
  };

  useEffect(() => {
    if(!isReading) cancel();
  }, [isReading]);

  const Options = () => {

    return (
      <div ref={toggleMenu.menuRef} className={"content-reader-options flex-con-2 fcol" + (isMobile ? ' mobile-content-reader-options' : '')}>
        <p>Voice</p>

        <select
          value={voiceIndex || ""}
          onChange={(event) => {
            dispatch({type : 'textEditor/readerSettings/update', payload : {voiceIndex : event.target.value}})
          }}
        >
          <option value="">Default</option>
          {voices.map((option, index) => (
            <option key={option.voiceURI} value={index}>
              {`${option.lang} - ${option.name}`}
            </option>
          ))}
        </select>

        <p>Speed : {speed}</p>
        <input
          className="slider"
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={speed}
          onChange={(event) => {
            dispatch({type : 'textEditor/readerSettings/update', payload : {speed : Number(event.target.value)}})
          }}
        />

        <p>Pitch : {pitch}</p>
        <input
          className="slider"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(event) => {
            dispatch({type : 'textEditor/readerSettings/update', payload : {pitch : event.target.value}})
          }}
        />

        <small>Restart Reading to see the effect</small>

      </div>
    );

  };

  return (
    <>
      <div className={"content-reader flex-con" + (isMobile ? ' mobile-content-reader' : '')}>
        {toggleMenu.isMenuOpen && <Options/>}

        <FontAwesomeIcon
          ref={toggleMenu.buttonRef}
          onClick={toggleMenu.toggle}
          className="caret-up-icon selectable"
          icon={faCaretUp}
        />

        {isReading ? (
          <FontAwesomeIcon
            onClick={disableReader}
            className="reader-icon selectable"
            icon={faVolumeHigh}
          />
        ) : (
          <FontAwesomeIcon
            onClick={enableReader}
            className="reader-icon selectable"
            icon={faVolumeMute}
          />
        )}
      </div>
    </>
  );
}
