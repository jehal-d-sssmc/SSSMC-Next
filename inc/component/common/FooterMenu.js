import react from 'react';

export default class FooterMenu extends react.Component {
  constructor(props){
    super(props);
    this.menuItems = [
      {
        heading: "Quick Links",
        type: "links",
        items: <ul>
          <li>
            <a href="/#/sri-Sathya-Sai">About Us</a>
          </li>
          <li>
            <a href="/#/audio-list-page">Listen</a>
          </li>
          <li>
            <a href="/#/article-list-page/other/category/0">Read</a>
          </li>
          <li>
            <a href="/#/album-list-page/other/category/0">Photo Gallery</a>
          </li>
          <li>
            <a href="/#/audio-group-playlist-page/playlists/category/0/0/playlist/list">
              Audio Playlists Page
            </a>
          </li>
          <li>
            <div className="sub-menu-holder">
              <a
                href="#/audio-group-playlist-page/all/Bhajans/a80e59ba-8850-4379-b659-e25d4d9a6222/0/playlist/header"
                className="ban-csr-pnt"
              >
                Bhajans
              </a>
            </div>
          </li>
          <li>
            <div className="sub-menu-holder">
              <a
                href="#/audio-group-playlist-page/all/Discourses/b6a2b7ac-2678-4b16-a5d9-4678fd928ebc/0/playlist/header"
                className="ban-csr-pnt"
              >
                Discourses
              </a>
            </div>
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
            <a href="https://archive.sssmediacentre.org" className="reduce-font-size">
              SSS Media Centre Legacy Website
            </a>
          </li>
          <li>
            <a
              href="https://www.sssmediacentre.org/#/article-detail-page-1/63b414fea4e2e2c0254ebb1d"
              className="reduce-font-size"
            >
              98th Birthday Logo - Download Version
            </a>
          </li>
        </ul>

      },
      {
        heading: "Radio Stream",
        type: "links",
        items: <ul>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Prasanthi Stream
          </a>
        </li>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Bhajan Stream
          </a>
        </li>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Discourse Stream
          </a>
        </li>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Telugu Stream
          </a>
        </li>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Vedic Chants
          </a>
        </li>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Sai Gayathri
          </a>
        </li>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Gayathri
          </a>
        </li>
        <li>
          <a className="ban-csr-pnt" target="_blank">
            Shiva Panchakshari
          </a>
        </li>
      </ul>
      
      },
      {
        heading: "Contact Us",
        class: "col-xl-6 col-md-6 col-12",
        items: <>
  <div className="row">
    <div className="col-md-6">
      <a
        href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x3bb164cc01cbaa33:0xcddd1a11e5fc9b95?utm_source=mstt_1&entry=gps"
        target="_blank"
      >
        <i>
          <img src="https://www.sssmediacentre.org/ef4ee3c78d40aa24c68ba1f1a6c14754.png" className="w-100" />
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
      <p>
        Whatsapp - 9393258258 <br />
        Telegram - Sri Sathya Sai Baba <br />
        Email:{" "}
        <a href="mailto:listener@sssmediacentre.org">
          listener@sssmediacentre.org
        </a>
      </p>
      <p />
      <p>
        <a href="/#/privacy-policy" target="_blank">
          Privacy Policy and Copyright Information
        </a>
      </p>
    </div>
  </div>
</>
      }
    ]    
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
        {
          this.menuItems.map((x)=>{
            return <div className={x.class !== undefined ? x.class : 'col-md-3 col-xl-3'}>
              <div className='footer-title'>
              <h5>{x.heading}</h5><hr />
              </div>
              <div className='footer-content'>
                {x.items}
              </div>
            </div>
          })
        }
        </div>
      </div>
    );
  }
}
