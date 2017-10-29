import { SELECT_CALENDAR } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_CALENDAR:
      return action.payload;

    default:
      return state;
  }
}
