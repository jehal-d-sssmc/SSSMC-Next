import React from "react";
import SwiperComp from "../Home/SwiperComp";
import Shorts from "../Home/Shorts";
import Watch from "../Home/Watch";
import Listen from "../Home/_Listen";
import Read from "../Home/Read";

import VideoPlayer from "react-background-video-player";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      featuredItems: [],
      shorts: [],
      listen: [],
      readToggle: "LATEST",
      readLatest: [],
      readFeatured: [],
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
    //if(featuredItems.type === success){
    this.setState({
      featuredItems: featuredItems,
    });
    //}

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
    let listen = await this.props.app.db(
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
    // console.log(listen);
    this.setState({
      listen: listen,
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
    console.log(readLatest);
    this.setState({
      readLatest: readLatest,
      loading: false,
    });
    this.forceUpdate();
    //console.log(featuredItems);

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
    console.log(readFeatured);
    this.setState({
      readFeatured: readFeatured,
      loading: false,
    });
    this.forceUpdate();
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <main>
        {this.state.loading ? (
          <>{this.props.loader}</>
        ) : (
          <>
            <section
              id=""
              className="bg-light"
              style={{
                padding: "45px 24px 45px 24px",
                position: "relative",
              }}
            >
              <div className="videooverlay">
                <VideoPlayer
                  className="video"
                  src={"/bg2.mp4"}
                  autoPlay={true}
                  muted={true}
                />
              </div>
              <div className="p-2"></div>
              <div style={{ margin: "0 15px" }}>
                <SwiperComp featuredItems={this.state.featuredItems} />
              </div>
            </section>
            
            <section id="shorts" className="p-3">
              <div className="" style={{ padding: "0px 15px" }}>
               
                <Shorts shorts={this.state.shorts} />
              </div>
            </section>

            <section id="streams" className="">
            <div style={{ padding: "15px" }}>
                <div className="section-header">
                  <div className="row">
                    <div className="col-12 align-self-center text-white text-center">
                      <h3 className="section-title text-white">Radio Streams</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vscroller container">
                    <div className="radio-grid">
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/morning_prayer.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/vedam.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/sai_gayatri.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/gayatri_mantra.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/shiv_panchakshari.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/prasanthi.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/bhajan.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/discourse.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="radio-grid-col">
                        <div className="radio-circle">
                          <a>
                            <div className="radio-circle-img">
                              <img src="//www.sssmediacentre.org/assets/images/radiostations/telugu.jpg" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
              </section>

            <section id="" className="p-3 pb-0">
              <div className="container" style={{ padding: "0px 15px" }}>
                <div className="section-header">
                  <div className="row">
                    <div className="col-12 align-self-center text-center text-white">
                      <h3 className="section-title text-white text-center">Listen</h3>
                      &nbsp; &gt; &nbsp;<a href="#" className="text-danger">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-2"></div>
                <Listen listen={this.state.listen} />

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
            </section>
            <section id="" className="p-3 pb-0 bg-light">
              <div style={{ padding: "0px 15px" }}>
                <div className="section-header">
                  <div className="row">
                    <div className="col-12 align-self-center">
                      <a
                        onClick={() => {
                          this.setState({
                            selectedCategory: "All",
                          });
                          this.props.redirect("/read");
                          this.forceUpdate();
                        }}
                        href={"#"}
                      >
                        <h3 className="section-title">Read</h3>
                        &nbsp; &gt; &nbsp;<a
                            onClick={() => {
                              this.setState({
                                selectedCategory: "All",
                              });
                              this.props.redirect("/read");
                              this.forceUpdate();
                            }}
                            href={"#"}
                            className="text-danger"
                          >
                            View More
                          </a>
                      </a>
                    </div>
                   
                  </div>
                </div>
                {this.state.readToggle === "LATEST" ? (
                  <Read {...this.props} read={this.state.readLatest} />
                ) : (
                  <Read {...this.props} read={this.state.readFeatured} />
                )}
                <ul class="nav nav-pills custom-tab">
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
                        this.state.readToggle === "FEATURED" ? "active" : ""
                      }`}
                    >
                      <span>FEATURED</span>
                    </a>
                  </li>
                </ul>
                <div className="p-2"></div>
              </div>
            </section>
          </>
        )}
      </main>
    );
  }
}
