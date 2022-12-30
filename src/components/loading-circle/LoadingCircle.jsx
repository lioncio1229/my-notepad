import useStore from "../../useStore";

const LoadingCircle = () => {
    const { state } = useStore();

    return (
        state.global.isLoading &&
        <div className="blocker">
            <div className="loading-circle">
                <img src="./loading.gif" alt="" />
            </div>
        </div>
    );
};

export default LoadingCircle;
