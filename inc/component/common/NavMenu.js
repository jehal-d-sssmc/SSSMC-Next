import react from "react";
import jQuery from "jquery";

import Streams from "../Home/Streams";
import SearchForm from "./SearchForm";

class NavMenu extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      watchCategories: [],
      listenCategories: [],
      readCategories: [],
    };
  }
  async componentDidMount() {
    const $ = jQuery;
    $(".submenu-title").each(function () {
      $(this).prepend(
        '<span class="goback"><i class="fa-solid fa-left-long"></i></span>'
      );
    });
    if ($(window).width() >= 767) {
      $(".menu > li .hasDropdown,.menu > li .mycontainer").on(
        "mouseenter",
        function () {
          console.log(this);
          $(".menu .overlay").fadeIn();
        }
      );
      $(".menu > li .hasDropdown").on("mouseenter", function () {
        $(this)
          .parent()
          .find(".mycontainer")
          .slideDown()
          .css("display", "flex");
      });
      $(".menu > li").on("mouseleave", function () {
        let visible = 0;
        $(this).find(".mycontainer").slideUp();
        //  console.log($(this).parent().find('.mycontainer').is(':visible'));

        $(".menu")
          .find(".mycontainer")
          .each(function () {
            if ($(this).is(":visible")) {
              visible++;
            }
          });
        console.log(visible);
        if (visible < 1) {
          $(this).parent().find(".overlay").fadeOut();
        }
      });
      $(".menu").on("mouseleave", function () {
        $(this).find(".mycontainer").slideUp();
      });
      $(".menu .overlay").on("mouseenter", function () {
        $(this).parent().find(".mycontainer").slideUp();
        $(this).fadeOut();
      });
    } else {
      $(".mynavbar .menu > li a").on("click", function () {
        console.log($(this));
        $(this).parent().addClass("open");
      });
      $(".mynavbar .menu > li .goback").on("click", function () {
        $(this)
          .parents("li")
          .each(function () {
            $(this).removeClass("open");
          });
      });
    }

    /* $(window).on('blur', function(){
      alert( 'Are you sure you want to leave?');
    });*/

    let watchCategories = await this.props.app.db(
      "GET",
      "find",
      "videocategories",
      { nameTree: { $size: 0 } },
      {
        order: {},
        limit: 1000,
      }
    );

    let readCategories = await this.props.app.db(
      "GET",
      "find",
      "articlecategories",
      { nameTree: { $size: 0 } },
      {
        order: {},
        limit: 1000,
      }
    );

    let listenCategories = await this.props.app.db(
      "GET",
      "find",
      "audiocategories",
      { nameTree: { $size: 0 } },
      {
        order: {},
        limit: 1000,
      }
    );

    this.setState({
      watchCategories: watchCategories.data,
      readCategories: readCategories.data,
      listenCategories: listenCategories.data,
    });
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
            <div className="overlay" style={{ display: "none" }}></div>
            <li>
              <a
                className="hasDropdown"
                href="#"
                onClick={() => {
                  /// this.props.redirect("/watch?cat=All");
                }}
              >
                <i className="fa-solid fa-photo-film"></i>&nbsp;
                <span>Watch</span>
              </a>

              <div className="mycontainer has-multi">
                <div className="mycontainer__list">
                  <div className="mycontainer__listItem">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="multi-sub-holder">
                          <div className="container">
                            <h5 className="submenu-title text-start">Video</h5>
                            <ul className="submenu">
                              {this.state.watchCategories.map((item) => {
                                return (
                                  <li>
                                    <a
                                      onClick={() => {
                                        this.props.redirect(
                                          `/watch?cat=${item.catogoryName}`
                                        );
                                        this.forceUpdate();
                                      }}
                                      href="#"
                                      className="dropdown-item ban-csr-pnt"
                                    >
                                      {item.catogoryName}
                                    </a>
                                  </li>
                                );
                              })}
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
              <a
                className="hasDropdown"
                href="#"
                onClick={() => {
                  // this.props.redirect("/listen");
                }}
              >
                <i className="fa-solid fa-headphones"></i>&nbsp;
                <span>Listen</span>
              </a>
              <ul className="mycontainer has-multi">
                <div className="mycontainer__list mycontainer__list-multi">
                  <div className="mycontainer__listItem">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <h5 className="submenu-title">Audio</h5>
                          <div className="containerx">
                            <ul className="submenu">
                              {this.state.listenCategories.map((item) => {
                                return (
                                  <li>
                                    <a
                                      onClick={() => {
                                        this.props.redirect(
                                          `/listen?cat=${item.catogoryName}`
                                        );
                                        this.forceUpdate();
                                      }}
                                      href="#"
                                      className="dropdown-item ban-csr-pnt"
                                    >
                                      {item.catogoryName}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <hr />
                        </div>
                        <div className="col-md-12 text-start">
                          <h5 className="submenu-title">Streams</h5>
                          <div className="mynav">
                            <Streams {...this.props} />
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
                  // this.props.redirect("/read");
                }}
                className="hasDropdown"
              >
                <i className="fa-brands fa-readme"></i>&nbsp;<span>Read</span>
              </a>
              <ul className="mycontainer has-multi">
                <div className="mycontainer__list mycontainer__list-multi">
                  <div className="mycontainer__listItem">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="multi-sub-holder">
                          <div className="container">
                            <h5 className="submenu-title text-start">
                              Article
                            </h5>
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
                <i className="fa-solid fa-download"></i>&nbsp;
                <span>Downloads</span>
              </a>

              <ul className="mycontainer has-multi">
                <div className="mycontainer__list">
                  <div className="mycontainer__listItem">
                    <div className="row">
                      <div className="col-md-12 text-start">
                        <div className="multi-sub-holder">
                          <div className="container">
                            <h5 className="submenu-title text-start">Photo</h5>
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
                <i className="fa-regular fa-face-grin-wide"></i>&nbsp;
                <span>Sai Inspires</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this.props.redirect("/social");
                }}
              >
                <i className="fa-solid fa-people-group"></i>&nbsp;
                <span>Social</span>
              </a>
            </li>
            <li>
              <a
                className=""
                href="#"
                onClick={() => {
                  this.props.redirect("/search");
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>&nbsp;
                <span>Search</span>
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default NavMenu;
