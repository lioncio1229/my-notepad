import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import useToggleMenu from '../text-editor/hooks/useToggleMenu';
import AccountMenu from '../account/AccountMenu';

export default function Header({picture})
{
    const {buttonRef, isMenuOpen, toggle, menuRef} = useToggleMenu();

    return (
      <>
        { isMenuOpen && <AccountMenu ref={menuRef} toggle={toggle}/>}

        <div className="header flex-con">
          <h1>MY NOTEPAD</h1>
          <FontAwesomeIcon className="header-file-icon" icon={faFileLines} />
          {picture ? (
            <img className="user-account selectable picture" src={picture} ref={buttonRef} onClick={() => toggle()} />
          ) : (
            <FontAwesomeIcon
              ref={buttonRef}
              className="user-account selectable"
              icon={faCircleUser}
              onClick={() => toggle()}
            />
          )}
        </div>
      </>
    );
}