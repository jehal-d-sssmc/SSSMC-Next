import React from "react";
import SwiperComp from "../Home/SwiperComp";
import Shorts from "../Home/Shorts";
import Listen from "../Home/Listen";
import Read from "../Home/Read";

import VideoPlayer from "react-background-video-player";
import Streams from "../Home/Streams";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      shorts: [],
      watchFeatured: [],
      watchLatest: [],
      listenFeatured: [],
      listenLatest: [],
      albumFeatured: [],
      albumLatest: [],
      readLatest: [],
      readFeatured: [],
      readToggle: "LATEST",
      albumToggle: "LATEST",
      listenToggle: "LATEST",
      watchToggle: "LATEST",
    };
    this.projects = [
      {
        title: "Sri Sathya Sai Central Trust",
        logo: "/sssct.png",
        link: "https://www.srisathyasai.org",
      },
      {
        title: "Sri Sathya Sai Global Council",
        logo: "/sssct.png",
        link: "https://www.srisathyasaiglobalcouncil.org/",
      },
      {
        title: "Sri Sathya Sai Divyasmṛti",
        logo: "/sssds.png",
        link: "https://www.sssdivyasmrti.org",
        color: "rgb(54, 21, 0)",
      },
      {
        title: "Sri Sathya Sai Prematharu",
        logo: "/sssprematharu.png",
        link: "https://sssprematharu.org/",
        color: "#084c1d",
      },
    ];
  }

  handleReadToggle = async (e) => {
    e.preventDefault();
    this.setState(
      {
        readToggle: e.target.innerText,
      },
      () => {
        console.log(this.state.readToggle);
      }
    );
    this.forceUpdate();
  };

  handleAlbumToggle = async (e) => {
    e.preventDefault();
    this.setState(
      {
        albumToggle: e.target.innerText,
      },
      () => {
        console.log(this.state.albumToggle);
      }
    );
    this.forceUpdate();
  };

  handleListenToggle = async (e) => {
    e.preventDefault();
    this.setState(
      {
        listenToggle: e.target.innerText,
      },
      () => {
        console.log(this.state.listenToggle);
      }
    );
    this.forceUpdate();
  };

  handleWatchToggle = async (e) => {
    e.preventDefault();
    this.setState(
      {
        watchToggle: e.target.innerText,
      },
      () => {
        console.log(this.state.watchToggle);
      }
    );
    this.forceUpdate();
  };

  async componentDidMount() {
    // console.log(this.props);
    this.setState({
      loading: true,
    });
    if(this.state.shorts.length < 1){
      await this.loaddata();
    }
  }

  loaddata = async () => {

    let shorts = await this.props.app.db(
      "GET",
      "find",
      "videos",
      {
        category: "Shorts",
      },
      {
        order: {
          createdAt: -1,
        },
      }
    );

    this.setState({
      shorts: shorts.data,
    });
    this.forceUpdate();

    let watchLatest = await this.props.app.db(
      "GET",
      "find",
      "videos",
      {
        category: { $ne: "Shorts" },
      },
      {
        order: {
          createdAt: -1,
        },
      }
    );

    this.setState({
      watchLatest: watchLatest.data,
    });
    this.forceUpdate();

    let watchFeatured = await this.props.app.db(
      "GET",
      "find",
      "videos",
      {
        $and: [{ isFeatureActive: true }, { category: { $ne: "Shorts" } }],
      },
      {
        order: {
          createdAt: -1,
        },
      }
    );

    this.setState({
      watchFeatured: watchFeatured.data,
    });
    this.forceUpdate();

    let listenLatest = await this.props.app.db(
      "GET",
      "find",
      "audios",
      {},
      {
        order: {
          createdAt: -1,
        },
      }
    );

    let listenFeatured = await this.props.app.db(
      "GET",
      "find",
      "audios",
      { isFeatureActive: true },
      {
        order: {
          createdAt: -1,
        },
      }
    );

    this.setState({
      listenFeatured: listenFeatured.data,
    });
    this.forceUpdate();

    let albumLatest = await this.props.app.db(
      "GET",
      "find",
      "audioplaylists",
      {},
      {
        order: {
          createdAt: -1,
        },
      }
    );

    this.setState({
      albumLatest: albumLatest.data,
    });
    this.forceUpdate();

    let albumFeatured = await this.props.app.db(
      "GET",
      "find",
      "audioplaylists",
      { isFeatureActive: true },
      {
        order: {
          createdAt: -1,
        },
      }
    );

    this.setState({
      albumFeatured: albumFeatured.data,
    });
    this.forceUpdate();

    let readLatest = await this.props.app.db(
      "GET",
      "find",
      "articles",
      {},
      {
        order: {
          createdAt: -1,
        },
        limit: 15,
      }
    );

    this.setState({
      readLatest: readLatest.data,
    });
    this.forceUpdate();

    let readFeatured = await this.props.app.db(
      "GET",
      "find",
      "articles",
      {
        isFeatureActive: true,
      },
      {
        order: {
          createdAt: -1,
        },
        limit: 15,
      }
    );

    this.setState({
      readFeatured: readFeatured.data,
    });
    this.forceUpdate();

    this.setState({
      watchFeatured: watchFeatured.data,
      watchLatest: watchLatest.data,
      listenFeatured: listenFeatured.data,
      listenLatest: listenLatest.data,
      albumFeatured: albumFeatured.data,
      albumLatest: albumLatest.data,
      loading: false,
      loaded: true,
    });
    this.forceUpdate();
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <main style={{ padding: "0" }}>
        {this.state.loading ? (
          <>{this.props.loader}</>
        ) : (
          <>
            <section
              id=""
              className="bg-light"
              style={{
                padding: "0 24px",
                position: "relative",
                height: "calc(100vh - 120px)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {this.state.loaded ? (
                <div className="videooverlay">
                  <VideoPlayer
                    className="video"
                    src={"/bg3.mp4"}
                    autoPlay={true}
                    muted={true}
                  />
                </div>
              ) : (
                <div
                  className="videooverlay novideo"
                  style={{ backgroundImage: "url('/stupa2.jpg')" }}
                ></div>
              )}
              <div className="imgOverlay">
                <div className="container">
                  <Streams {...this.props} />
                </div>
              </div>
            </section>
            {this.state.shorts.length > 0 && (
              <section id="shorts" className="p-3 bg-white">
                <div className="" style={{ padding: "0px 15px" }}>
                  <div className="section-header pb-3">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <h3 className="section-title">Shorts</h3>
                      </div>
                    </div>
                  </div>
                  <Shorts shorts={this.state.shorts} />
                </div>
              </section>
            )}

            {this.state.watchLatest.length > 0 && (
              <section id="watch" className="bg-white p-3">
                <div style={{ margin: "0 15px" }}>
                  <div className="section-header pb-3">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <a
                          onClick={() => {
                            this.props.redirect("/watch");
                            this.forceUpdate();
                          }}
                          href={"#"}
                        >
                          <h3 className="section-title">Watch</h3>
                          &nbsp; &gt; &nbsp;
                          <a
                            onClick={() => {
                              this.props.redirect("/watch");
                              this.forceUpdate();
                            }}
                            href={"#"}
                            className="text-danger"
                          >
                            View More
                          </a>
                        </a>
                        <ul class="nav nav-tabs custom-tab">
                          <li class="nav-item">
                            <a
                              onClick={this.handleWatchToggle}
                              href={"#"}
                              class={`nav-link ${
                                this.state.watchToggle === "LATEST"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span>LATEST</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              onClick={this.handleWatchToggle}
                              href={"#"}
                              class={`nav-link ${
                                this.state.watchToggle === "FEATURED"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span>FEATURED</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="p-2"></div>

                  {this.state.watchToggle === "LATEST" ? (
                    <SwiperComp
                      {...this.props}
                      featuredItems={this.state.watchLatest}
                    />
                  ) : (
                    <SwiperComp
                      {...this.props}
                      featuredItems={this.state.watchFeatured}
                    />
                  )}

                  <div className="p-2"></div>
                </div>
              </section>
            )}

            {this.state.shorts.length > 0 && (
              <section id="listen" className="p-3 pb-0 bg-white">
                <div className="" style={{ padding: "0px 15px" }}>
                  <div className="section-header">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <a
                          onClick={() => {
                            this.props.redirect("/listen");
                            this.forceUpdate();
                          }}
                          href={"#"}
                        >
                          <h3 className="section-title">Listen</h3>
                          &nbsp; &gt; &nbsp;
                          <a
                            onClick={() => {
                              this.props.redirect("/listen");
                              this.forceUpdate();
                            }}
                            href={"#"}
                            className="text-danger"
                          >
                            View More
                          </a>
                        </a>
                        <ul class="nav nav-tabs custom-tab">
                          <li class="nav-item">
                            <a
                              onClick={this.handleListenToggle}
                              href={"#"}
                              class={`nav-link ${
                                this.state.listenToggle === "LATEST"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span>LATEST</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              onClick={this.handleListenToggle}
                              href={"#"}
                              class={`nav-link ${
                                this.state.listenToggle === "FEATURED"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span>FEATURED</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="p-2"></div>

                  {this.state.listenToggle === "LATEST" ? (
                    <Listen {...this.props} listen={this.state.listenLatest} />
                  ) : (
                    <Listen
                      {...this.props}
                      listen={this.state.listenFeatured}
                    />
                  )}

                  <div className="p-2"></div>
                </div>
              </section>
            )}

            {this.state.readLatest.length > 0 && (
              <section id="read" className="p-3 pb-0 bg-white">
                <div style={{ padding: "0px 15px" }}>
                  <div className="section-header">
                    <div className="row">
                      <div className="col-12 align-self-center">
                        <a
                          onClick={() => {
                            this.props.redirect("/read");
                            this.forceUpdate();
                          }}
                          href={"#"}
                        >
                          <h3 className="section-title">Read</h3>
                          &nbsp; &gt; &nbsp;
                          <a
                            onClick={() => {
                              this.props.redirect("/read");
                              this.forceUpdate();
                            }}
                            href={"#"}
                            className="text-danger"
                          >
                            View More
                          </a>
                        </a>

                        <ul class="nav nav-tabs custom-tab">
                          <li class="nav-item">
                            <a
                              onClick={this.handleReadToggle}
                              href={"#"}
                              class={`nav-link ${
                                this.state.readToggle === "LATEST"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span>LATEST</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              onClick={this.handleReadToggle}
                              href={"#"}
                              class={`nav-link ${
                                this.state.readToggle === "FEATURED"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span>FEATURED</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="p-2"></div>

                  {this.state.readToggle === "LATEST" ? (
                    <Read {...this.props} read={this.state.readLatest} />
                  ) : (
                    <Read {...this.props} read={this.state.readFeatured} />
                  )}

                  <div className="p-2"></div>
                </div>
              </section>
            )}

            <section id="projects" className="p-3 pb-0 bg-white">
              <div className="p-3"></div>
              <div className="project-list">
                {this.projects.map((x) => {
                  return (
                    <div className="text-center">
                      <a
                        href={x.link}
                        target="_blank"
                        style={{
                          color: x.color !== undefined ? x.color : "#d21d25",
                        }}
                        ref={"noreferrer"}
                      >
                        <div
                          className="project-logo"
                          style={{
                            maxHeight: "90px",
                            maxWidth: "90px",
                            margin: "auto",
                          }}
                        >
                          <img
                            src={x.logo}
                            alt={x.title}
                            style={{ maxWidth: "100%" }}
                          />
                        </div>

                        <h5 className="project-title pt-3">{x.title}</h5>
                      </a>
                    </div>
                  );
                })}
              </div>
              <div className="p-3"></div>
            </section>
          </>
        )}
      </main>
    );
  }
}
