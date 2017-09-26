import axios from 'axios';

export const FETCH_CLIENTS = 'FETCH_CLIENTS';

export function fetchClients() {
  const url = '../data/data.json';
  const request = axios.get(url);

  return {
    type: FETCH_CLIENTS,
    payload: request
  };
}
