import { combineReducers } from 'redux';
import ClientsReducer from './reducer_clients';

const rootReducer = combineReducers({
  clients: ClientsReducer
});

export default rootReducer;
