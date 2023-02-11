import useStore from "../../useStore";
import { useEffect, useState } from "react";
import { loadingCircle } from "../../config";

const LoadingCircle = () => {
    const { state } = useStore();
    const [message, setMessage] = useState(null);
    const isLoading = state.global.isLoading;

    useEffect(() => {
        let timeout;

        const cancel = () => {
            if(timeout) clearTimeout(timeout);
            setMessage(null);
        }

        if(isLoading)
        {
            timeout = setTimeout(() => {
                setMessage(loadingCircle.message);
            }, loadingCircle.timeout);
        }
        else cancel();

        return () => cancel();
    }, [isLoading]);

    return (
        isLoading &&
        <div className="blocker">
            <div className="loading-circle flex-con fcol">
                <img src="./loading.gif" alt="" />
                {
                    message &&
                    <div className="flex-con fcol">
                        <p>This is taking too long to load</p>
                        <button className="selectable" onClick={() => window.location.reload()}>Reload</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default LoadingCircle;
