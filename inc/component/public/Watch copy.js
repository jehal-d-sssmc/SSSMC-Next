import React from "react";

import Masonry from "react-masonry-css";
import SwiperComp from "../Home/SwiperComp";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      videoCategories: [],
      allShorts: [],
      featuredShorts: [],
      featuredVideos: [],
      allVideos: [],
    };
  }

  __ = (url) => {
    try {
      let _url = new URL(url);
      return url;
    } catch (_) {
      return `https://content.sssmediacentre.org/${url}`;
    }
  };

  async componentDidMount() {
    this.forceUpdate();
    let allShorts = await this.props.app.db(
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
        limit: 12,
      }
    );
    this.forceUpdate();

    let featuredShorts = await this.props.app.db(
      "GET",
      "find",
      "videos",
      {
        category: "Shorts",
        isFeatureActive: true,
      },
      {
        order: {
          createdAt: -1,
        },
        limit: 12,
      }
    );
    this.forceUpdate();

    let allVideos = await this.props.app.db(
      "GET",
      "find",
      "videos",
      {},
      {
        order: {
          createdAt: -1,
        },
        limit: 18,
      }
    );
    this.forceUpdate();

    let featuredVideos = await this.props.app.db(
      "GET",
      "find",
      "videos",
      {
        isFeatureActive: true,
      },
      {
        order: {
          createdAt: -1,
        },
        limit: 12,
      }
    );
    this.forceUpdate();

    let categories = await this.props.app.db(
      "GET",
      "find",
      "videocategories",
      {},
      {}
    );
    categories = categories.data;
    this.forceUpdate();

    this.setState(
      {
        loading: false,
        videoCategories: categories,
        allVideos: allVideos,
        featuredVideos: featuredVideos,
        allShorts: allShorts,
        featuredShorts: featuredShorts,
      },
      () => {
        console.log(
          videoCategories,
          allVideos,
          featuredVideos,
          allShorts,
          featuredShorts
        );
      }
    );
    this.forceUpdate();

    //console.log(featuredItems);
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <main>
        {this.state.loading ? (
          <>{this.props.loader}</>
        ) : (
          <>
            <section id="" className="">
              <div className="p-4"></div>
              <div style={{ margin: "0 15px" }}>
                <SwiperComp
                  classname="fvideo"
                  featuredItems={this.state.featuredItems}
                />
              </div>
            </section>
            <div className="p-4">
              <div>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb p-2">
                    <li className="breadcrumb-item">
                      <a href={this.props.app.helper.siteUrl}>Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      <a href="#">Watch</a>
                    </li>
                  </ol>
                </nav>
              </div>

              <div>
                <h1>Videos</h1>
              </div>

              <div className="containerx">
                <div className="p-3"></div>

                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {this.state.allVideos.map((item, i) => {
                        return (
                          <div
                            key={i}
                            className="card text-center my-masonry-grid_column p-2"
                            style={{ borderRadius: "15px" }}
                          >
                            <div className="position-relative">
                              <div
                                className={
                                  item.category !== "Shorts"
                                    ? `ratio ratio-4x3`
                                    : `ratio ratio-9x16`
                                }
                              >
                                <div className="stretch">
                                  {
                                    <a
                                      href={item.file_url}
                                      class="fancybox"
                                      data-fancybox="true"
                                      flink="f_videos"
                                      data-caption={item.title}
                                    >
                                      <img
                                        class="d-block w-100"
                                        src={this.__(`${item.thumb_path}`)}
                                        alt={item.title}
                                        style={{ width: "100%" }}
                                      />
                                    </a>
                                  }
                                </div>
                              </div>
                              <div className="featuredContent">
                                <h5>{item.title}</h5>
                                <span>{item.category}</span>
                              </div>
                              <div className="clearfix"></div>
                            </div>
                          </div>
                        );
                      })}
                    </Masonry>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <div
                      className="position-sticky"
                      style={{
                        top: "90px",
                        overflow: "auto",
                        maxHeight: "85vh",
                      }}
                    >
                      <div className="card">
                        <div className="card-header">
                          <h5 className="m-0">Search</h5>
                        </div>
                        <div className="card-body">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                        </div>
                      </div>
                      <div className="p-2"></div>
                      <div className="card">
                        <div className="card-header">
                          <h5 className="m-0">Categories</h5>
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            {this.state.videoCategories.map((x) => {
                              return (
                                <li className="list-group-item">
                                  <a href={`#${x.catogoryName}`}>
                                    {x.catogoryName}
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
          </>
        )}
      </main>
    );
  }
}
