import React from 'react';
import FooterMenu from './FooterMenu';

export default class Footer extends React.Component {
  render() {
    return (
      <>
        <div>
          <footer className="topnav">
            <div className="logo">
              <img src="https://www.sssmediacentre.org/755f75139b00a808ae072efc6cdd7ae8.png" />{' '}
              <span>SRI SATHYA SAI</span>
            </div>

            <div style={{ flexGrow: '1' }}>
              <FooterMenu />
            </div>
          </footer>
          <div className="signature text-center p-4 bg-dark-1">
            <img
              src="https://www.sssmediacentre.org/3b747c129ddbee2fc2adf3b9d28dfbdf.jpg"
              className="img-responsive"
              alt=""
            />
          </div>
          <div className="copyright text-center p-3 bg-dark-0">
            &copy; {new Date().getFullYear()} SSSMC Division. All Rights
            Reserved
          </div>
        </div>
      </>
    );
  }
}
