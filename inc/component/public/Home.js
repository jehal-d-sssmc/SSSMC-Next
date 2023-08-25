import React from "react";
import SwiperComp from "../Home/SwiperComp";
import Shorts from "../Home/Shorts";
import Watch from "../Home/Watch";
import Listen from "../Home/Listen";
import Read from "../Home/Read";

import VideoPlayer from "react-background-video-player";
import Streams from "../Home/Streams";
import Album from "../Home/Album";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      featuredItems: [],
      shorts: [],
      listenFeatured: [],
      listenLatest: [],
      readLatest: [],
      readFeatured: [],
      albumFeatured: [],
      albumLatest: [],
      watchLatest: [],
      readToggle: "LATEST",
      albumToggle: "LATEST",
      listenToggle: "LATEST",
      watchToggle: "LATEST",
    };
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
    console.log(this.props);
    let featuredItems = await this.props.app.db(
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
      featuredItems: featuredItems,
      watchLatest: watchLatest,
      loading: false,
    });
    this.forceUpdate();

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
      shorts: shorts,
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
      listenLatest: listenLatest,
      albumLatest: albumLatest,
      listenFeatured: listenFeatured,
      albumFeatured: albumFeatured,
    });

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
      readLatest: readLatest,
      loading: false,
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
      readFeatured: readFeatured,
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

            <section id="watch" className="bg-white p-3">
              <div style={{ margin: "0 15px" }}>
                <div className="section-header pb-3">
                  <div className="row">
                    <div className="col-12 align-self-center">
                      <h3 className="section-title">Watch</h3>
                      &nbsp; &gt; &nbsp;
                      <a href="#" className="text-danger">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <SwiperComp featuredItems={this.state.featuredItems} />
              </div>
            </section>

            <section id="" className="p-3 pb-0 bg-white">
              <div className="" style={{ padding: "0px 15px" }}>
                <div className="section-header">
                  <div className="row">
                    <div className="col-12 align-self-center">
                      <h3 className="section-title">Listen</h3>
                      &nbsp; &gt; &nbsp;
                      <a href="#" className="text-danger">
                        View More
                      </a>
                      <ul class="nav nav-tabs custom-tab">
                        <li class="nav-item">
                          <a class="nav-link active">
                            <span>LATEST</span>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <span>POPULAR</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-2"></div>
                <Listen {...this.props} listen={this.state.listen} />
              </div>
            </section>

            <section id="" className="p-3 pb-0 bg-white">
              <div className="" style={{ padding: "0px 15px" }}>
                <div className="section-header">
                  <div className="row">
                    <div className="col-12 align-self-center">
                      <a
                        onClick={() => {
                          this.props.redirect("/albums");
                          this.forceUpdate();
                        }}
                        href={"#"}
                      >
                        <h3 className="section-title">Listen Playlists</h3>
                        &nbsp; &gt; &nbsp;
                        <a
                          onClick={() => {
                            this.props.redirect("/albums");
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
                              this.state.readToggle === "LATEST" ? "active" : ""
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
                <Album {...this.props} listen={this.state.album} />
              </div>
            </section>

            <section id="" className="p-3 pb-0 bg-light">
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
                              this.state.readToggle === "LATEST" ? "active" : ""
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
                {this.state.readToggle === "LATEST" ? (
                  <Read {...this.props} read={this.state.readLatest} />
                ) : (
                  <Read {...this.props} read={this.state.readFeatured} />
                )}

                <div className="p-2"></div>
              </div>
            </section>
          </>
        )}
      </main>
    );
  }
}
