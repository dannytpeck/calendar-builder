import { combineReducers } from 'redux';
import ClientsReducer from './reducer_clients';
import ClientReducer from './reducer_client';
import CalendarReducer from './reducer_calendar';

const rootReducer = combineReducers({
  clients: ClientsReducer,
  selectedClient: ClientReducer,
  selectedCalendar: CalendarReducer
});

export default rootReducer;
