import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "../../utils";

export default function ConfirmationBox({title='No Title', message='No Message', icon, onConfirm, onDeny, onClose})
{    
    const closeBox = () => {
        if(onClose) onClose();
    }

    const confirm = () => 
    {
        if(onConfirm) onConfirm();
        closeBox();
    }

    const deny = () => 
    {
        if(onDeny) onDeny();
        closeBox();
    }

    return(
        <div className="blocker">
            <div className={"confirmation-box pos-abs-center "+(isMobile ? 'mobile-confirmationbox' : '')}>
                <div className="flex-con">
                    <div className="flex-con">
                        {icon && <FontAwesomeIcon className="icon" icon={icon}/>}
                        <div className="confirmation-title">{title}</div>
                    </div>
                    <FontAwesomeIcon onClick={closeBox} className="icon selectable" icon={faSquareXmark}/>
                </div>

                <div>{message}</div>
                <div className="vertical-divider"></div>
                <div className="flex-con-2">
                    <button onClick={confirm} className={"selectable btn-" + (isMobile ? 'mobile' : 'm')}>Yes</button>
                    <button onClick={deny} className={"selectable btn-" + (isMobile ? 'mobile' : 'm')}>No</button>
                </div>
            </div>
        </div>
    );
}