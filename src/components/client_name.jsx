import React from 'react';

function ClientName({ selectedClient }) {
  return (
    <h4 className="client-name my-5">{selectedClient.fields['Account Name']}</h4>
  );
}

export default ClientName;
