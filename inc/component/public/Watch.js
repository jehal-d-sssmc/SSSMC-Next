import React from "react";

import Masonry from "react-masonry-css";
import Shorts from "../Watch/Shorts";
import SwiperComp from "../Watch/SwiperComp";

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
      extraLoading: false,
      featuredWatchItems: [],
      watchItems: [],
      selectedWatchItems: [],
      watchIndex: 0,
      selectedWatchIndex: 0,
      watchCategories: [],
      selectedCategory: "All",
      categoryEmpty: false,
      viewMoreDisabledState: false,
    };
  }

  handleClick = async (e) => {
    e.preventDefault();
    if (this.state.selectedCategory === "All") {
      let extraWatchItems = await this.props.app.db(
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
          limit: 15,
          skip: this.state.watchIndex * 15,
        }
      );

      let curItems = this.state.watchItems;
      let curIndex = this.state.watchIndex;
      curIndex++;
      extraWatchItems.data.forEach((item) => {
        curItems.push(item);
      });
      this.setState({
        watchItems: curItems,
        watchIndex: curIndex,
      });
      this.forceUpdate();

      if (extraWatchItems.data.length < 15) {
        this.setState({
          viewMoreDisabledState: true,
        });
        this.forceUpdate();
        return;
      }
    } else {
      let extraWatchItems = await this.props.app.db(
        "GET",
        "find",
        "videos",
        {
          category: this.state.selectedCategory,
        },
        {
          order: {
            createdAt: -1,
          },
          limit: 15,
          skip: this.state.selectedWatchIndex * 15,
        }
      );

      let curSelIndex = this.state.selectedWatchIndex;
      let curSelItems = this.state.selectedWatchItems;
      curSelIndex++;
      extraWatchItems.data.forEach((item) => {
        curSelItems.push(item);
      });
      this.setState({
        selectedWatchItems: curSelItems,
        selectedWatchIndex: curSelIndex,
      });
      this.forceUpdate();

      if (extraWatchItems.data.length < 15) {
        this.setState({
          viewMoreDisabledState: true,
        });
        this.forceUpdate();
        return;
      }
    }
  };

  handleCatClick = async (e) => {
    e.preventDefault();
    await this.setState({
      categoryEmpty: false,
      selectedWatchItems: [],
      selectedWatchIndex: 0,
      viewMoreDisabledState: false,
      selectedCategory: e.target.text,
    });

    if (this.state.selectedCategory === "All") {
      this.setState({
        selectedCategory: "All",
      });
      this.forceUpdate();
      return;
    }

    let selWatchItems = await this.props.app.db(
      "GET",
      "find",
      "videos",
      {
        category: this.state.selectedCategory,
      },
      {
        order: {
          createdAt: -1,
        },
        limit: 15,
        skip: this.state.selectedWatchIndex * 15,
      }
    );
    if (selWatchItems.data.length === 0) {
      this.setState({
        categoryEmpty: true,
      });
      this.forceUpdate();
      return;
    }

    let curSelIndex = this.state.selectedWatchIndex;
    let curSelItems = this.state.selectedWatchItems;
    curSelIndex++;
    selWatchItems.data.forEach((item) => {
      curSelItems.push(item);
    });
    this.setState({
      selectedWatchItems: curSelItems,
      selectedWatchIndex: curSelIndex,
    });
    this.forceUpdate();
  };

  __ = (url) => {
    try {
      let _url = new URL(url);
      return url;
    } catch (_) {
      return `https://content.sssmediacentre.org/${url}`;
    }
  };

  async componentDidMount() {
    let featuredWatchItems = await this.props.app.db(
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
        limit: 12,
      }
    );
    this.setState({
      featuredWatchItems: featuredWatchItems.data,
    });

    let watchItems = await this.props.app.db(
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
        limit: 18,
      }
    );
    this.setState({
      watchItems: watchItems.data,
    });

    let watchCategories = await this.props.app.db(
      "GET",
      "find",
      "videocategories",
      {},
      {
        order: {},
        limit: 1000,
      }
    );
    this.setState({
      watchCategories: watchCategories.data,
    });

    this.setState({
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
            <div className="row">
              <section className="featured-watch">
                <div className="p-4">
                  <SwiperComp
                    {...this.props}
                    featuredItems={this.state.featuredWatchItems}
                  />
                </div>
              </section>
              <section className="main-watch p-4">
                <div className="containerx p-2">
                  <>
                    <div>
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb p-2">
                          {this.state.selectedCategory === "All" ? (
                            <>
                              <li className="breadcrumb-item">
                                <a
                                  onClick={() => {
                                    this.props.redirect("/");
                                  }}
                                  href={"#"}
                                >
                                  Home
                                </a>
                              </li>
                              <li className="breadcrumb-item active">
                                <a href="#">Watch</a>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="breadcrumb-item">
                                <a
                                  onClick={() => {
                                    this.props.redirect("/");
                                  }}
                                  href={"#"}
                                >
                                  Home
                                </a>
                              </li>
                              <li className="breadcrumb-item">
                                <a
                                  onClick={() => {
                                    this.setState({
                                      selectedCategory: "All",
                                    });
                                    this.props.redirect("/watch");
                                    this.forceUpdate();
                                  }}
                                  href={"#"}
                                >
                                  Watch
                                </a>
                              </li>
                              <li className="breadcrumb-item active">
                                <a href="#">{this.state.selectedCategory}</a>
                              </li>
                            </>
                          )}
                        </ol>
                      </nav>
                    </div>

                    <div>
                      <h1>Videos</h1>
                    </div>

                    <div className="row">
                      <div className="col-md-8 col-lg-9">
                        <div className="main-watch-masonry">
                          {!this.state.categoryEmpty ? (
                            <Masonry
                              breakpointCols={breakpointColumnsObj}
                              className="my-masonry-grid"
                              columnClassName="my-masonry-grid_column"
                            >
                              {this.state.selectedCategory != "All"
                                ? this.state.selectedWatchItems.map((item) => {
                                    return (
                                      <div
                                        className="card text-center my-masonry-grid_column p-2"
                                        style={{ borderRadius: "15px" }}
                                      >
                                        <div className="position-relative">
                                          <div className="ratio ratio-4x3">
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
                                                    src={this.__(
                                                      `${item.thumb_path}`
                                                    )}
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
                                  })
                                : this.state.watchItems.map((item) => {
                                    return (
                                      <div
                                        className="card text-center my-masonry-grid_column p-2"
                                        style={{ borderRadius: "15px" }}
                                      >
                                        <div className="position-relative">
                                          <div className="ratio ratio-4x3">
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
                                                    src={this.__(
                                                      `${item.thumb_path}`
                                                    )}
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
                          ) : (
                            <div className="empty-category text-center">
                              <h4 className="pt-2 pb-2 text-secondary">
                                No Videos Found!
                              </h4>
                            </div>
                          )}
                          <div className="text-center loadMore mt-2 mb-3">
                            <button
                              disabled={this.state.viewMoreDisabledState}
                              onClick={this.handleClick}
                              type="button"
                              class="btn btn-secondary"
                            >
                              View More
                            </button>
                          </div>
                        </div>
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
                                <li className="list-group-item">
                                  <a onClick={this.handleCatClick} href={`#`}>
                                    All
                                  </a>
                                </li>
                                {this.state.watchCategories.map((x) => {
                                  return (
                                    <li className="list-group-item">
                                      <a
                                        onClick={this.handleCatClick}
                                        href={`#${x.catogoryName}`}
                                      >
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
                  </>
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    );
  }
}
