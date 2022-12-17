import useToggleMenu from "./hooks/useToggleMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function NoteInfo({dateCreated, lastModified})
{
    const toggleMenu = useToggleMenu();
    
    const info = () => {
        return (
            <div ref={toggleMenu.menuRef} className="info-menu">
                <div className="content flex-con fcol">
                    <h2>Info</h2>
                    <p> Date Created : {dateCreated} </p>
                    <p> Last Modified : {lastModified} </p>
                </div>
            </div>
        )
    }

    return (
        <div className="note-info">
            {toggleMenu.isMenuOpen && info()}
            <FontAwesomeIcon ref={toggleMenu.buttonRef} onClick={toggleMenu.toggle} className="icon selectable" icon={faCircleInfo} />
        </div>
    );
}