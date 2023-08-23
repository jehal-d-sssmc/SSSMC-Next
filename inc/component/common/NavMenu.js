import react from "react";
import jQuery from "jquery";

import Streams from "../Home/Streams";


class NavMenu extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    
  }
  componentDidMount() {
    const $ = jQuery;
    $('.menu > li .hasDropdown,.menu > li .mycontainer').on('mouseenter',function(){
      console.log(this)
      $('.menu .overlay').fadeIn();
    })
    $('.menu > li .hasDropdown').on('mouseenter', function(){
      $(this).parent().find('.mycontainer').slideDown().css('display', 'flex');
    });
    $('.menu > li').on('mouseleave', function(){

    let visible = 0;
      $(this).find('.mycontainer').slideUp();
    //  console.log($(this).parent().find('.mycontainer').is(':visible'));
      
      $('.menu').find('.mycontainer').each(function(){
        if($(this).is(':visible')){
          visible++;
        }
        
      });
      console.log(visible);
      if(visible < 1){
        $(this).parent().find('.overlay').fadeOut();
      }
    })
    $('.menu').on('mouseleave', function(){
      $(this).find('.mycontainer').slideUp();
    })
    $('.menu .overlay').on('mouseenter',function(){
      $(this).parent().find('.mycontainer').slideUp();
      $(this).fadeOut();
    })
   /* $(window).on('blur', function(){
      alert( 'Are you sure you want to leave?');
    });*/
    this.forceUpdate();
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <>
        <div
          className="mobile-menu"
          onClick={() => {
            this.setState(
              {
                showMenu: !this.state.showMenu,
              },
              () => {
                this.forceUpdate();
              }
            );
          }}
        >
          <i
            className={`${
              this.state.showMenu ? "fa fa-close " : "fa fa-bars "
            }fa-3x js-menu-icon`}
          ></i>
        </div>
        <nav
          className={`mynavbar js-mynavbar${
            this.state.showMenu ? " show" : ""
          }`}
        >
          <ul className="menu m-0">

          <div className="overlay" style={{display:"none"}}></div>
            <li>
              <a
                className="hasDropdown"
                href="#"
                onClick={() => {
                  this.props.redirect("/watch");
                }}
              >
                <i className="fa-solid fa-photo-film"></i>&nbsp;Watch
              </a>

              <div className="mycontainer has-multi">
                <div className="mycontainer__list">
                  <div className="mycontainer__listItem">
                    <div className="row" style={{maxHeight:"70vh"}}>
                      <div className="col-md-12">
                       
                        <div className="multi-sub-holder" >
                          <div className="container">
                            <ul className="submenu" >
                              <li>
                                <a
                                href="#/video-list-page/header/Animations/5547b3c5-8ab5-413e-975a-0cc6ee0aa3dc"
                                className="dropdown-item ban-csr-pnt"
                                 >
                                Animations
                              </a>

                              </li>
                              
                              <li>
                              <a
                                href="#/video-list-page/header/Audio Book/abf4be28-bd15-49e2-92a2-cfbeac3cba20"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Audio Book
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Bhajan/5c7f52a8-0b9a-411c-ad4b-0f960cbf948b"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Bhajan
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Concert/866c9e1e-a599-445a-b29a-6e108d4c0f18"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Concert
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Conversations/cd21ecfb-30d9-47d1-bf18-cd462328458d"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Conversations
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Darshan/95eef64e-339d-4b41-a8da-28e5ff61618e"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Darshan
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Discourses/64b26510-5f47-47f4-b606-78f5227fb597"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Discourses
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Documentaries/041b382d-9ce8-4750-96dd-9f3dff1617f3"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Documentaries
                              </a>
                              </li>
                              <li>

                              <a
                                href="#/video-list-page/header/Drama/43d69ecd-3687-4ac5-9c77-084813402e92"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Drama
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Hosted Show/02d175f0-8f1a-414a-aaae-308d087173b6"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Hosted Show
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Kids World/e1260674-e0f1-4995-8d0b-9efc8e4dc6a8"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Kids World
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Mandir/LIVE Events/6fec718f-4aa5-44eb-b2c8-efbbce97fad3"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Mandir/LIVE Events
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Music Video/0a78aa8a-80d3-4758-895a-805364f81dc9"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Music Video
                              </a>
                              </li>
                             <li>
                             <a
                                href="#/video-list-page/header/Podcast/6a9de326-f253-470a-aefb-df9e9772604a"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Podcast
                              </a>
                             </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Shorts/6ebbaed3-9d73-4514-8851-9196d2429970"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Shorts
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Songs/f0b83d9d-cf10-444b-b8c3-1d26d18edc33"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Songs
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Talks/d39aba46-d863-4980-a34a-450b6abff753"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Talks
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Thematic Presentations/b7ebb640-0879-4c68-843a-a60219fdd456"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Thematic Presentations
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Vedam/627c47b2-9fa8-4381-a433-151453496ff7"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Vedam
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/video-list-page/header/Web Series/8172edd4-10b6-4e28-b024-0a7a078de519"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Web Series
                              </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a className="hasDropdown" href="#" onClick={()=>{
                this.props.redirect('/albums')
              }}>
                <i className="fa-solid fa-headphones"></i>&nbsp;Listen
              </a>
              <ul className="mycontainer has-multi">
                <div className="mycontainer__list mycontainer__list-multi">
                  <div className="mycontainer__listItem">
                    <div className="row">
                      <div className="col-md-3 text-start">
                        <h5 className="section-title">Radio Stream</h5>
                        <hr />
                        <div className="mynav">
                        <Streams {...this.props} />
                        </div>
                      </div>
                      <div className="col-md-9 text-start">
                        <h5 className="section-title">Audio</h5>
                        <hr />
                        <div className="container">
                          <ul className="submenu">
                            
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Bhajans/a80e59ba-8850-4379-b659-e25d4d9a6222/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Bhajans
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Book Readings/61eb9e1b-9be1-4580-bdcb-704c6650bc62/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Book Readings
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Concerts/19590210-38ce-4acf-b931-a692f1b02332/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Concerts
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Conversations/32fe4930-7b88-4a43-8fdc-bb5f48d53ab9/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Conversations
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Discourses/b6a2b7ac-2678-4b16-a5d9-4678fd928ebc/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Discourses
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Discussions/52614c43-6315-4110-a3e8-725f58ea91ae/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Discussions
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Documentaries/bb6c0f0d-1e42-4dee-bda6-55a29b7d0ffd/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Documentaries
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Drama/4e7881a2-f129-4176-8ba2-7b03f8c14d65/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Drama
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Instrumental/7ed6aa86-9d9c-42f5-a386-0b1aec1801a4/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Instrumental
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Mandir Events/05be569f-ee17-4c46-b110-41001a1baa16/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Mandir Events
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Songs/cdf4ceb6-b9fa-4407-b7d1-b0b68fbbafeb/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Songs
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Talk Shows/b9cb5d3a-cc18-443f-b874-d04df088d423/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Talk Shows
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Talks/aad7ad38-6b25-4f0c-a0c2-31b26e6d646d/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Talks
                            </a>
                            </li>
                            <li>
                            <a
                              href="#/audio-group-playlist-page/all/Vedam/642f00a9-7d64-43fd-8d92-f0613a5b0395/0/playlist/header"
                              className="dropdown-item ban-csr-pnt"
                            >
                              Vedam
                            </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this.props.redirect("/read");
                }}
                className="hasDropdown"
              >
                <i className="fa-brands fa-readme"></i>&nbsp;Read
              </a>
              <ul className="mycontainer has-multi">
                <div className="mycontainer__list mycontainer__list-multi">
                  <div className="mycontainer__listItem">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="multi-sub-holder">
                          <div className="container">
                            <ul className="submenu">
                              <li>
                              <a
                                href="#/article-list-page/header/Announcements/7c6f6a2f-11ff-4f12-9970-81d5f3d0afaf"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Announcements
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/article-list-page/header/Lessons from Sai/5b2448a6-6248-48a6-b96b-ad1f0987ae2b"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Lessons from Sai
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/article-list-page/header/Life of Sai/fef6c99d-f48b-4f22-88bb-11df2ea763fa"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Life of Sai
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/article-list-page/header/Message of Sai/38e0a5f3-7987-45af-893f-bb81fe1f6bc3"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Message of Sai
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/article-list-page/header/Moments with Sai/80acbf63-cb39-44a5-84d5-c0e491a67a0a"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Moments with Sai
                              </a>
                              </li>
                              <li>

                              <a
                                href="#/article-list-page/header/Play With Sai/0249037b-1a6c-49d0-8400-4399de99b8d3"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Play With Sai
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/article-list-page/header/Projects of Sai/c4ed6fcd-eff8-49ac-a72e-4260e63fdbd6"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Projects of Sai
                              </a>
                              </li>
                              <li>
                              <a
                                href="#/article-list-page/header/Seva for Sai/b984cf93-0ea1-4950-9567-04b380538ec2"
                                className="dropdown-item ban-csr-pnt"
                              >
                                Seva for Sai
                              </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <a href="#" className="hasDropdown">
                <i className="fa-solid fa-download"></i>&nbsp;Downloads
              </a>

              <ul className="mycontainer has-multi">
                <div className="mycontainer__list">
                  <div className="mycontainer__listItem">
                    <div className="row">
                      <div className="col-md-12 text-start">
                        
                        <div className="multi-sub-holder">
                          <div className="container">
                            <ul className="submenu">
                              <li>
                              <a
                                  href="#/album-list-page/header/Facets of His Abode/fe7a48aa-9a31-4d56-a7f0-d4d15018037f"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  Facets of His Abode
                                </a>
                              </li>
                              <li>
                              <a
                                  href="#/album-list-page/header/Facets of His Form/88ece8b1-0d20-4dbc-88b7-c324d3bf507e"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  Facets of His Form
                                </a>
                              </li> 
                              <li>
                              <a
                                  href="#/album-list-page/header/Festive Wallpapers/6c650e5f-a026-46e1-9c35-afc40c767e4a"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  Festive Wallpapers
                                </a>
                              </li>
                              <li>
                              <a
                                  href="#/album-list-page/header/Mandir Events/5bead4d7-c0cf-4c00-972c-bf2e2687d775"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  Mandir Events
                                </a>
                              </li>
                              <li>
                              <a
                                  href="#/album-list-page/header/Mobile Wallpapers/dd7e0418-bca9-49f5-9dad-9e4644f34f96"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  Mobile Wallpapers
                                </a>
                              </li>
                              <li>
                              <a
                                  href="#/album-list-page/header/Places of Interest/3fe5b1bd-df33-455d-825a-c6ca316ac893"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  Places of Interest
                                </a>
                              </li>
                                <li>
                                <a
                                  href="#/album-list-page/header/Sri Sathya Sai Mission/f789a769-ffd4-401d-8aea-330d0c613b4f"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  Sri Sathya Sai Mission
                                </a>
                                </li>
                                
                                <li>
                                <a
                                  href="https://www.sssmediacentre.org/#/article-detail-page-1/63b414fea4e2e2c0254ebb1d"
                                  className="dropdown-item ban-csr-pnt"
                                >
                                  98th Birthday Logo
                                </a>
                                </li>
                              
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this.props.redirect("/sai-inspires");
                }}
              >
                <i className="fa-regular fa-face-grin-wide"></i>&nbsp;Sai
                Inspires
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this.props.redirect("/social");
                }}
              >
                <i className="fa-solid fa-people-group"></i>&nbsp;Social
              </a>
            </li>
            <li>
              <a className="hasDropdown" href="#" onClick={() => {
                  this.props.redirect("/search");
                }}>
                <i className="fa-solid fa-magnifying-glass"></i>&nbsp;Search
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default NavMenu;
