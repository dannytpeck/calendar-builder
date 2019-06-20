import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import ShowCalendars from './show_calendars';
import AddCalendar from './add_calendar';

function clientsReducer(state, action) {
  return [...state, ...action];
}

function App() {
  const [view, setView] = useState('ShowCalendars');
  const [selectedClient, setSelectedClient] = useState(null);

  const [clients, dispatch] = React.useReducer(
    clientsReducer,
    [] // initial clients
  );

  // When app first mounts, fetch clients
  useEffect(() => {

    base('Clients').select().eachPage((records, fetchNextPage) => {
      dispatch(records);

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

  }, []); // Pass empty array to only run once on mount

  function selectClient(client) {
    setSelectedClient(client);
  }

  function renderView(view) {
    switch (view) {
      case 'ShowCalendars':
        return (
          <ShowCalendars
            clients={clients}
            selectedClient={selectedClient}
            selectClient={selectClient}
            handleAddClick={viewAddCalendar} />
        );
      case 'AddCalendar':
        return (
          <AddCalendar
            selectedClient={selectedClient}
            handleCancelClick={viewShowCalendars}
            handleNextClick={viewShowCalendars} />
        );
    }
  }

  function viewShowCalendars() {
    setView('ShowCalendars');
  }

  function viewAddCalendar() {
    setView('AddCalendar');
  }

  return (
    <div className="app">
      {renderView(view)}
    </div>
  );
}

export default App;
