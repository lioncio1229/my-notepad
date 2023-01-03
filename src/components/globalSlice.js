
export const initialState = {
    isLoading : false,
    isGuestMode : false,
    account : {
        picture : undefined
    }
}

export default function globalReducer(state, action)
{
    switch(action.type)
    {
        case 'global/isLoading':
            return {
                ...state,
                isLoading : action.payload
            };
        case 'global/setAccount':
            return {
                ...state,
                account : {
                    picture : action.payload.picture
                }
            };
        case 'global/setGuestMode':
            return {
                ...state,
                isGuestMode : action.payload
            }
        default:
            return state;
    }
}
