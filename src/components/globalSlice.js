
export const initialState = {
    isLoading : false
}

export default function globalReducer(state, action)
{
    switch(action.type)
    {
        case 'global/isLoading':
            return {
                ...state,
                isLoading : action.payload
            }
        default:
            return state;
    }
}
