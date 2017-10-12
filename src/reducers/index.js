import { combineReducers } from 'redux';
import ClientsReducer from './reducer_clients';
import ClientReducer from './reducer_client';

const rootReducer = combineReducers({
  clients: ClientsReducer,
  selectedClient: ClientReducer
});

export default rootReducer;
