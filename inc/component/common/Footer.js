import React from "react";
import FooterMenu from "./FooterMenu";
import CardMusic from "./CardMusic";
import Draggable from "react-draggable"; // The default

export default class Footer extends React.Component {
  componentDidMount() {}

  shouldComponentUpdate = () => false;

  render() {
    return (
      <>
       
        <div>
          <footer className="topnav">
            <div style={{ flexGrow: "1" }}>
              <FooterMenu />
            </div>

            <div className="copyright text-center p-3">
              &copy; {new Date().getFullYear()} SSSMC Division. All Rights
              Reserved
            </div>
          </footer>
        </div>
      </>
    );
  }
}
