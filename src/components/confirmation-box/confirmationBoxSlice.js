
export const initialState = {
  isOn: false,
};

export default function confirmationBoxReducer(state, action) {
  switch (action.type) {
    case "confirmationBox/show":
      return { isOn: true, };
    case "confirmationBox/hide":
      return { isOn: false };
    default:
      return state;
  }
}
