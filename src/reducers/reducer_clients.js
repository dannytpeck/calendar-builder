import { FETCH_CLIENTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CLIENTS:
      console.log(action.payload.data);
      return action.payload.data.records;

    default:
      return state;
  }
}
