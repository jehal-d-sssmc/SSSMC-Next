import react from "react";

export default class FooterMenu extends react.Component {
  constructor(props) {
    super(props);
    this.menuItems = [
      {
        
        type: "links",
        items: (
          <ul className="footer-menu list-inline text-center">
            <li className="list-inline-item">
              <a onClick={()=>{
                this.props.redirect('/page/sri-sathya-sai')
              }} href="/page/sri-Sathya-Sai">About Us</a>
            </li>
            <li className="list-inline-item">
              <a href="/contact" onClick={(e)=>{
                e.preventDefault();
                this.props.redirect('/contact')
              }}>
                Contact Us
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://careers.sssmediacentre.org" target="_blank" rel={'noreferrer'}>
                Careers
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://content.sssmediacentre.org/websiteasset/trademark/pdf/trademark.pdf" target="_blank" rel={'noreferrer'}>
                TradeMark
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://content.sssmediacentre.org/websiteasset/sitemap/pdf/sitemap.pdf" target="_blank" rel={'noreferrer'}>
                SiteMap
              </a>
            </li>
            
            <li className="list-inline-item">
              <a
                href="https://archive.sssmediacentre.org"
                className="reduce-font-size" target="_blank" rel={'noreferrer'}
              >
                SSS Media Centre Legacy Website
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/page/privacy-policy" onClick={()=>{
                this.props.redirect('/page/privacy-policy')
              }}>
                Privacy Policy and Copyright
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.srisathyasaiglobalcouncil.org/" target="_blank" rel={'noreferrer'}>Sri Sathya Sai Global Council</a>
            </li>
          </ul>
        ),
      }
    ];
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.menuItems.map((x) => {
            return (
              <div
                className={
                  x.class !== undefined ? x.class : "col-md-12 col-xl-12"
                }
              >
                <div className="footer-title">
                  {
                    x.heading !== undefined && 
                    <> <h5>{x.heading}</h5>
                    <hr />
                    </>
                  }
                 
                </div>
                <div className="footer-content">{x.items}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
