
export const initialState = {
    isDirty : false,
    isReading : false,
    display : {
        isWide : false,
        isLong : false,
        isFullscreen : false
    },
    readerSettings : {
        voiceIndex : null,
        speed : 1,
        pitch : 1
    }
}

export default function textEditorReducer(state, action)
{
    switch (action.type) {
        case 'textEditor/dirty':
            return {
                ...state,
                isDirty : action.payload,
            };
        case 'textEditor/reading':
            return {
                ...state,
                isReading : action.payload
            }
        case 'textEditor/readerSettings/update':
            return {
              ...state,
              readerSettings: { ...state.readerSettings, ...action.payload },
            };
        case 'textEditor/display/update':
            return {
                ...state,
                display : {...state.display, ...action.payload}
            }
        default:
            return state;
    }
}