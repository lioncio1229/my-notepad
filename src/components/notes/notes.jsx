import Note from "./note";
import NotesSort from "./notesSort";
import { isMobile } from "../../utils";

export default function Notes({notes, onAddNote, onDeleteNote, onClickNote}) {

  return (
    <>
    {
      <div className={"notes flex-con fcol" + (isMobile ? ' mobile-notes' : '')}>
        <div className="list">
          {
            notes.map(note => {
              const info =
                (note.dateCreated === note.lastModified
                  ? "Date Created "
                  : "Last Modified ") + note.lastModified;

              return <Note
                  key={note._id}
                  id={note._id}
                  info={note.dateCreated ? info : '--'}
                  title={note.title}
                  onNoteClick={onClickNote}
                  onNoteDelete={onDeleteNote}
                />
              })
          }
        </div>

        <div className="foot-con flex-con-2">
          <div className="flex-con-2" style={{width : '90%'}}>
            <button onClick={onAddNote} className="btn-l selectable">
              Add Note
            </button>
            <NotesSort />
          </div>
        </div>
      </div>
    }
    </>
  );
}
