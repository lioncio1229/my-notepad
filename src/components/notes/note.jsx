import { useRef } from 'react';
import useCurrentNote from './hooks/useCurrentNote';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFileLines, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Note({
  id,
  title = "No Title",
  info,
  onNoteClick,
  onNoteDelete,
  isMobile,
}) {
  const { note } = useCurrentNote();
  const noteRef = useRef();

  const handleNoteClick = () => {
    if (onNoteClick) onNoteClick(id);
  };

  const handleNoteDelete = (e) => {
    e.stopPropagation();
    if (onNoteDelete) onNoteDelete(id);
  };

  const handleMouseEnter = () => {
    noteRef.current.style.visibility = "visible";
  };

  const handleMouseLeave = () => {
    noteRef.current.style.visibility = "hidden";
  };

  const getClass =
  "list-item flex-con selectable " +
  (note?._id === id && !isMobile ? "active" : "inactive");

  return (
    <div
      onClick={handleNoteClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={getClass}
    >
      <FontAwesomeIcon className="list-item-icon" icon={faFileLines} />

      <div className="list-item-info">
        <p>{title}</p>
        <small>{info}</small>
      </div>
      <div ref={noteRef} className="delete-button">
        <FontAwesomeIcon
          className="icon"
          onClick={handleNoteDelete}
          icon={faTrash}
        />
      </div>
    </div>
  );
}