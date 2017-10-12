import { SELECT_CLIENT } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_CLIENT:
      return action.payload;

    default:
      return state;
  }
}
