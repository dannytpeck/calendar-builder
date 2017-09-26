import { FETCH_CLIENTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CLIENTS:
      return [action.payload.data];

    default:
      return state;
  }
}
