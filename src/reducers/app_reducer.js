import { INPUTACTION } from '../actions/change_input';
import { CHECK } from '../actions/change_check';

function appReducer(state = {}, action) {
  let newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case INPUTACTION:
      newState = { ...state, inputValue: payload.value };
      break;
    case CHECK:
      newState = { ...state, checked : payload.arrayItm };
      break;
    default:
      break;
  }
  return newState;
}
export default appReducer;
