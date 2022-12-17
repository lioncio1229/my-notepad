import useStore from "../../../useStore"

export default function useCurrentNote()
{
    const {state, dispatch} = useStore();
    const {list, currentId} = state.notes;
    const note = list[currentId];

    return {note, state, dispatch};
}