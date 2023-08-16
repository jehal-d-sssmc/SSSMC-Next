import React from "react";
import FooterMenu from "./FooterMenu";

export default class Footer extends React.Component {

 
  render() {
    return (
      <>
        <div>
          <footer className="topnav">
            


            <div style={{ flexGrow: "1" }}>
              <FooterMenu />
            </div>
           
            <div className="copyright text-center p-3">
              &copy; {new Date().getFullYear()} SSSMC Division. All Rights Reserved
            </div>
          </footer>
          
        </div>
      </>
    );
  }
}
