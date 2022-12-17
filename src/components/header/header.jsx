import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

export default function Header()
{
    return (
        <div className="header flex-con">
            <h1>MY NOTEPAD</h1>
            <FontAwesomeIcon className='header-file-icon' icon={faFileLines} />
            <FontAwesomeIcon className='user-account selectable' icon={faCircleUser} />
        </div>
    );
}