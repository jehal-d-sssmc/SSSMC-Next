import React from 'react';
import NavMenu from './NavMenu';

export default class Header extends React.Component {
  render() {
    return (
      <>
        <div>
          <header className="topnav">
            
            <div className="logo">
              <img src="https://www.sssmediacentre.org/755f75139b00a808ae072efc6cdd7ae8.png" />{' '}
              <span>SRI SATHYA SAI</span>
            </div>
          
            <div style={{ flexGrow: '1' }}>
              <NavMenu />
            </div>
          </header>
        </div>
      </>
    );
  }
}
