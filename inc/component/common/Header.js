import React from "react";

import NavMenu from "./NavMenu";

class Header extends React.Component {



  render() {
    return (
      <>
        <div
          className="position-sticky header-container"
          style={{ top: "0", zIndex: "999" }}
        >
          <header className="topnav">
            <div className="logo user-select-pointer">
              <a href="#" onClick={()=>{
                this.props.redirect(this.props.app.helper.siteUrl);
              }}>
                <img src="https://www.sssmediacentre.org/755f75139b00a808ae072efc6cdd7ae8.png" />{" "}
                <span>SRI SATHYA SAI</span>
              </a>
            </div>

            <div style={{ flexGrow: "1" }}>
              <NavMenu {...this.props} />
            </div>
          </header>
        </div>
      </>
    );
  }
}

export default (Header);
