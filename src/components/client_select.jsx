import React from 'react';

function ClientSelect({ clients, parentSelectClient }) {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  function handleChange(e) {
    if (e.target.value) {
      setOpen(true);
      setSearchText(e.target.value);
    } else {
      setOpen(false);
      setSearchText('');
    }
  }

  function selectClient(client) {
    parentSelectClient(client);
    setOpen(false);
    setSearchText(client.fields['Account Name']);
  }

  function renderClient(client) {
    const name = client.fields['Account Name'];
    return (
      <span className="dropdown-item" key={name} onClick={() => selectClient(client)}>
        {name}
      </span>
    );
  }

  const filteredClients = clients.filter(client => {
    const name = client.fields['Account Name'].toLowerCase();
    return name.includes(searchText.toLowerCase());
  });

  return (
    <div className="client-select">
      <h5>Select Client</h5>
      <div className="dropdown">
        <div className="client-search input-group">
          <input value={searchText} onChange={handleChange} type="text" className="form-control" placeholder="Client" />
          <span className="oi oi-magnifying-glass"></span>
        </div>

        <div className={'client-list dropdown-menu ' + (open ? 'show' : '')}>
          {filteredClients.length ? filteredClients.map(client => renderClient(client)) : ''}
        </div>
      </div>
    </div>
  );
}

export default ClientSelect;
