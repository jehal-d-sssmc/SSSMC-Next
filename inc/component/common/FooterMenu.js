import react from "react";

export default class FooterMenu extends react.Component {
  constructor(props) {
    super(props);
    this.menuItems = [
      {
        heading: "Quick Links",
        type: "links",
        items: (
          <ul>
            <li>
              <a href="/#/sri-Sathya-Sai">About Us</a>
            </li>
            <li>
              <a href="https://content.sssmediacentre.org/websiteasset/trademark/pdf/trademark.pdf">
                TradeMark
              </a>
            </li>
            <li>
              <a href="https://content.sssmediacentre.org/websiteasset/sitemap/pdf/sitemap.pdf">
                SiteMap
              </a>
            </li>
            <li>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeDxlpml7NBDVbM6grIWBu-g3u13UiibpvmkcI4LGVXhLvCoQ/viewform">
                FeedBack
              </a>
            </li>
            <li>
              <a
                href="https://archive.sssmediacentre.org"
                className="reduce-font-size" target="_blank" rel={'noreferrer'}
              >
                SSS Media Centre Legacy Website
              </a>
            </li>
            <li>
              <a href="/#/privacy-policy">
                Privacy Policy and Copyright
              </a>
            </li>
            <li>
              <a href="https://www.srisathyasaiglobalcouncil.org/" target="_blank" rel={'noreferrer'}>Sri Sathya Sai Global Council</a>
            </li>
          </ul>
        ),
      },
      {
        heading: "Quick Links",
        type: "links",
        items: (
          <>
            <p>Space for QR Code</p>
            <p />
            <p>
              No need to place seperate links, QR code can have linktree link.
            </p>
          </>
        ),
      },
      {
        heading: "Contact Us",
        class: "col-xl-6 col-md-6 col-12",
        items: (
          <>
            <div className="row">
              <div className="col-md-6">
                <a
                  href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x3bb164cc01cbaa33:0xcddd1a11e5fc9b95?utm_source=mstt_1&entry=gps"
                  target="_blank"
                >
                  <i>
                    <img
                      src="https://www.sssmediacentre.org/ef4ee3c78d40aa24c68ba1f1a6c14754.png"
                      className="w-100"
                    />
                  </i>
                </a>
              </div>
              <div className="col-md-6">
                <p>
                  Sri Sathya Sai Media Centre <br />
                  Prasanthi Nilayam <br />
                  Puttaparthi - 515134 <br />
                  Sri Sathya Sai District <br />
                  Andhra Pradesh{" "}
                </p>
                <p />
                <p></p>
              </div>
            </div>
          </>
        ),
      },
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
                  x.class !== undefined ? x.class : "col-md-3 col-xl-3"
                }
              >
                <div className="footer-title">
                  <h5>{x.heading}</h5>
                  <hr />
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
