import React from 'react';

function Header() {
  function reloadPage() {
    window.location.reload();
  }

  return (
    <div className="header">
      <a onClick={reloadPage}>
        <img className="home-button" src="images/icon_home.svg" title="Home"/>
      </a>
      <img className="logo" src="images/ADURO-Logo-Horizontal.png" />
      <h3 className="my-4">Calendar Builder</h3>
      <h5 className="text-danger">INTERNAL USE ONLY</h5>
      <p>Do not share this link outside of Aduro.</p>
    </div>
  );
}

export default Header;
