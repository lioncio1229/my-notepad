import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

export default function Header({picture})
{
    return (
        <div className="header flex-con">
            <h1>MY NOTEPAD</h1>
            <FontAwesomeIcon className='header-file-icon' icon={faFileLines} />
            {
                picture ? <img className='user-account selectable picture' src={picture} /> : <FontAwesomeIcon className='user-account selectable' icon={faCircleUser} />
            }
        </div>
    );
}