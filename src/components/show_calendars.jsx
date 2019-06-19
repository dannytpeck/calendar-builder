import React from 'react';

import Header from './header';
import ClientSelect from './client_select';
import Calendars from './calendars';
import GetStartedFolder from './get_started_folder';

function ShowCalendars({ clients, selectClient, selectedClient, handleAddClick }) {
  return (
    <div className="show-calendars">
      <Header />

      <ClientSelect clients={clients} parentSelectClient={selectClient} />

      {selectedClient ? <Calendars selectedClient={selectedClient} handleAddClick={handleAddClick} /> : <GetStartedFolder />}
    </div>
  );
}

export default ShowCalendars;
