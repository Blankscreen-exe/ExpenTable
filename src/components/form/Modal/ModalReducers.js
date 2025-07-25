
export function WarningsReducer(state, action) {
  switch (action.type) {
    case "SET_TITLE_WARNING":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          titleWarning: action.value,
        }
      }
    case "SET_REPEATED_TITLE_WARNING":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          repeatedTitleWarning: action.value,
        },
      }
    case "REMOVE_ID_WARNINGS":
      const { [action.id]: _, ...rest } = state;
      return rest;
    default:
      return state;
  };
};

export const warningsCases = {
  setTitleWarning: 'SET_TITLE_WARNING',
  setRepeatedTitleWarning: 'SET_REPEATED_TITLE_WARNING',
  removeId: 'REMOVE_ID_WARNINGS',
}