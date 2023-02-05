import useStore from "./useStore";

const useTokenId = () => {
    return useStore().state.global.account.tokenId;
}

export default useTokenId;