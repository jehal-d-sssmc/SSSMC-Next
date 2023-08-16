import react from 'react';

export default class NavMenu extends react.Component {
  render() {
    return (
      <>
        <div className="mobile-menu">
          <i className="fa fa-bars fa-3x js-menu-icon"></i>
        </div>
        <nav className="mynavbar js-mynavbar">
          <ul className="menu m-0">
            <li>
              <a className="hasDropdown" href="#">
                <i className="fa-solid fa-photo-film"></i>&nbsp;Watch
              </a>

              <ul className="mycontainer has-multi">
                <div className="mycontainer__list">
                  <div className="mycontainer__listItem">
                    <div>Televisions</div>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <a className="hasDropdown" href="#">
                <i className="fa-solid fa-headphones"></i>&nbsp;Listen
              </a>
              <ul className="mycontainer has-multi">
                <div className="mycontainer__list mycontainer__list-multi">
                  <div className="mycontainer__listItem">
                    <div>Televisions</div>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-readme"></i>&nbsp;Read
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-download"></i>&nbsp;Downloads
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-regular fa-face-grin-wide"></i>&nbsp;Sai
                Inspires
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-share-nodes"></i>&nbsp;Social
              </a>
            </li>
            <li>
              <a className="hasDropdown" href="#">
                <i className="fa-solid fa-magnifying-glass"></i>&nbsp;Search
              </a>
              <ul className="mycontainer">
                <div className="mycontainer__list" style={{flexDirection:"column"}}>
                  <div className="mycontainer__listItem">
                    
                    <input id="search-input" className="form-control shadow-none ps-4 search-input autocomplete" autocomplete="off" aria-label="Search" name="s" placeholder="Search here..." type="text"  spellcheck="false" data-ms-editor="true" />
                    
                  </div>
                </div>
              </ul>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
