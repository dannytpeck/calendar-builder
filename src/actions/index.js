import axios from 'axios';

export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const SELECT_CLIENT = 'SELECT_CLIENT';
export const SELECT_CALENDAR = 'SELECT_CALENDAR';

export function fetchClients() {
  const url = '../data/data.json';
  const request = axios.get(url);

  return {
    type: FETCH_CLIENTS,
    payload: request
  };
}

export function selectClient(client) {
  return {
    type: SELECT_CLIENT,
    payload: client
  };
}

export function selectCalendar(calendar) {
  return {
    type: SELECT_CALENDAR,
    payload: calendar
  };
}
