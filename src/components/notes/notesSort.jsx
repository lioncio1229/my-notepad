import useStore from "../../useStore";
import useToggleMenu from "../text-editor/hooks/useToggleMenu"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Radio from "./radioButton";
import { sortTypes } from "./notesSlice";

export default function NotesSort()
{
    const {state, dispatch} = useStore();
    const {sortType, isAscending} = state.notes;
    const toggleMenu = useToggleMenu();

    const options = () => {
        return (
            <div ref={toggleMenu.menuRef} className="sort-option">
                {
                    Object.keys(sortTypes).map(key => {
                        const item = sortTypes[key];
                        return <Radio
                            key={key}
                            value={item}
                            selected={sortType}
                            text={item.name}
                            onChange={(value) => dispatch({type : 'notes/sort', payload : {sortType : value}})}
                        />
                    })
                }
                <div className="vertical-divider"></div>
                <Radio
                    value={true}
                    selected={isAscending}
                    text={'Ascending'}
                    onChange={(value) => dispatch({type : 'notes/sort', payload : {isAscending : value}})}
                />
                <Radio
                    value={false}
                    selected={isAscending}
                    text={'Descending'}
                    onChange={(value) => dispatch({type : 'notes/sort', payload : {isAscending : value}})}
                />
            </div>
        )
    }
    
    return (
        <div className="sort">
            {toggleMenu.isMenuOpen && options()}
            <FontAwesomeIcon ref={toggleMenu.buttonRef} onClick={toggleMenu.toggle} className="sort-button selectable" icon={faSort} />
        </div>
    )
}