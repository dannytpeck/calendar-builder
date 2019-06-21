import React from 'react';

import ClientName from './client_name';
import CalendarTable from './calendar_table';
import ConfirmDeleteModal from './confirm_delete_modal';
import ConfirmUploadModal from './confirm_upload_modal';

function Calendars({ selectedClient, handleAddClick }) {
  return (
    <div>
      <ClientName selectedClient={selectedClient} />

      <h5 className="my-5">Calendars:</h5>

      <CalendarTable selectedClient={selectedClient} />

      <ConfirmDeleteModal />
      <ConfirmUploadModal />

      <div className="add-calendar-button my-4" onClick={handleAddClick}>
        <img className="add-icon" src="images/icon_add.svg" />
        <h5>Add New Calendar</h5>
      </div>
    </div>
  );
}

export default Calendars;
