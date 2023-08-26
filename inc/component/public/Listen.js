import React from "react";

import Masonry from "react-masonry-css";
import SwiperComp from "../Listen/SwiperComp";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default class Listen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      extraLoading: false,
      featuredListenItems: [],
      listenItems: [],
      selectedListenItems: [],
      listenIndex: 0,
      selectedListenIndex: 0,
      listenCategories: [],
      selectedCategory: this.props.cat,
      categoryEmpty: false,
      viewMoreDisabledState: false,
      music: this.props.app.musicRef.getMusic(),
    };
  }

  handleClick = async (e) => {
    e.preventDefault();
    if (this.state.selectedCategory === "All") {
      let extraListenItems = await this.props.app.db(
        "GET",
        "find",
        "audios",
        {},
        {
          order: {
            createdAt: -1,
          },
          limit: 15,
          skip: this.state.listenIndex * 15,
        }
      );

      let curItems = this.state.listenItems;
      let curIndex = this.state.listenIndex;
      curIndex++;
      extraListenItems.data.forEach((item) => {
        curItems.push(item);
      });
      this.setState({
        listenItems: curItems,
        listenIndex: curIndex,
      });
      this.forceUpdate();

      if (extraListenItems.data.length < 15) {
        this.setState({
          viewMoreDisabledState: true,
        });
        this.forceUpdate();
        return;
      }
    } else {
      let extraListenItems = await this.props.app.db(
        "GET",
        "find",
        "audios",
        {
          category: this.state.selectedCategory,
        },
        {
          order: {
            createdAt: -1,
          },
          limit: 15,
          skip: this.state.selectedListenIndex * 15,
        }
      );

      let curSelIndex = this.state.selectedListenIndex;
      let curSelItems = this.state.selectedListenItems;
      curSelIndex++;
      extraListenItems.data.forEach((item) => {
        curSelItems.push(item);
      });
      this.setState({
        selectedListenItems: curSelItems,
        selectedListenIndex: curSelIndex,
      });
      this.forceUpdate();

      if (extraListenItems.data.length < 15) {
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
      selectedListenItems: [],
      selectedListenIndex: 0,
      selectedCategory: e.target.text,
      viewMoreDisabledState: false,
    });

    if (e.target.text === "All") {
      this.setState({
        listenIndex: 0,
        listenItems: [],
      });
      let againListenItems = await this.props.app.db(
        "GET",
        "find",
        "audios",
        {},
        {
          order: {
            createdAt: -1,
          },
          limit: 15,
          skip: this.state.listenIndex * 15,
        }
      );
      this.setState(
        {
          listenItems: againListenItems.data,
          listenIndex: 1,
        },
        () => {
          console.log(this.state.listenItems);
        }
      );
      this.forceUpdate();
      return;
    }

    let selListenItems = await this.props.app.db(
      "GET",
      "find",
      "audios",
      {
        category: this.state.selectedCategory,
      },
      {
        order: {
          createdAt: -1,
        },
        limit: 15,
        skip: this.state.selectedListenIndex * 15,
      }
    );

    console.log(selListenItems.length);
    if (selListenItems.data.length === 0) {
      this.setState({
        categoryEmpty: true,
      });
      this.forceUpdate();
      return;
    }

    let curSelIndex = this.state.selectedListenIndex;
    let curSelItems = this.state.selectedListenItems;
    curSelIndex++;
    selListenItems.data.forEach((item) => {
      curSelItems.push(item);
    });
    this.setState({
      selectedListenItems: curSelItems,
      selectedListenIndex: curSelIndex,
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
    this.forceUpdate();
    let ListenItems = {};
    if (this.state.selectedCategory === "All") {
      ListenItems = await this.props.app.db(
        "GET",
        "find",
        "audios",
        {},
        {
          order: {
            createdAt: -1,
          },
          limit: 18,
        }
      );
    } else {
      ListenItems = await this.props.app.db(
        "GET",
        "find",
        "audios",
        {
          category: this.state.selectedCategory,
        },
        {
          order: {
            createdAt: -1,
          },
          limit: 18,
        }
      );
    }

    this.setState({
      listenItems: ListenItems.data,
      selectedListenItems: ListenItems.data,
    });

    this.forceUpdate();

    let listenCategories = await this.props.app.db(
      "GET",
      "find",
      "audiocategories",
      {
        nameTree: { $size: 0 },
      },
      {
        order: {},
        limit: 1000,
      }
    );

    this.setState(
      {
        loading: false,
        listenItems: ListenItems.data,
        listenCategories: listenCategories.data,
      },
      () => {
        console.log(this.state.listenItems);
      }
    );
    this.forceUpdate();
  }

  setMusic = async (attr = {}) => {
    this.music = this.state.music;
    this.music.musicList = [attr];

    this.music.player = true;
    this.music.index = 0;
    this.setState(
      {
        music: this.music,
      },
      () => {
        this.props.app.musicRef.togglePlayer(true);
        // this.props.setMusic(this.music, n);
      }
    );
  };

  shouldComponentUpdate = () => false;

  render() {
    return (
      <main>
        {this.state.loading ? (
          <>{this.props.loader}</>
        ) : (
          <>
            <div className="row">
              <section className="main-listen p-4">
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
                                <a href="#">Listen</a>
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
                                    this.forceUpdate();
                                    this.props.redirect("/listen?cat=All");
                                    this.forceUpdate();
                                  }}
                                  href={"#"}
                                >
                                  Listen
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
                      <h1>Listen</h1>
                    </div>

                    <div className="row">
                      <div className="col-md-8 col-lg-9">
                        <div className="main-listen-masonry">
                          {!this.state.categoryEmpty ? (
                            <Masonry
                              breakpointCols={breakpointColumnsObj}
                              className="my-masonry-grid"
                              columnClassName="my-masonry-grid_column"
                            >
                              {this.state.selectedCategory != "All"
                                ? this.state.selectedListenItems.map((item) => {
                                    return (
                                      <div
                                        className="text-center my-masonry-grid_column p-2"
                                        style={{ borderRadius: "15px" }}
                                      >
                                        <div className="position-relative">
                                          <div className="ratio ratio-4x3">
                                            <div
                                              className="stretch"
                                              style={{ cursor: "zoom-in" }}
                                              onClick={() => {
                                                this.setMusic({
                                                  name: `${item.title} | ${item.catogory}`,
                                                  author: item.album_name,
                                                  img: `https://content.sssmediacentre.org/${item.file_identifier_thumb}`,
                                                  audio: `https://content.sssmediacentre.org/${item.file_identifier}`,
                                                  duration: item.duration,
                                                  group: item.grouping,
                                                });
                                              }}
                                            >
                                              {
                                                <img
                                                  class="d-block w-100"
                                                  src={this.__(
                                                    `${item.file_identifier_thumb}`
                                                  )}
                                                  alt={item.title}
                                                  style={{ width: "100%" }}
                                                />
                                              }
                                            </div>
                                          </div>
                                          <div className="featuredContent">
                                            <h5>{item.title}</h5>
                                            <span>{item.catogory}</span>
                                          </div>
                                          <div className="clearfix"></div>
                                        </div>
                                      </div>
                                    );
                                  })
                                : this.state.listenItems.map((item) => {
                                    return (
                                      <div
                                        className="text-center my-masonry-grid_column p-2"
                                        style={{ borderRadius: "15px" }}
                                      >
                                        <div className="position-relative">
                                          <div className="ratio ratio-4x3">
                                            <div
                                              className="stretch"
                                              style={{ cursor: "zoom-in" }}
                                              onClick={() => {
                                                this.setMusic({
                                                  name: `${item.title} | ${item.catogory}`,
                                                  author: item.album_name,
                                                  img: `https://content.sssmediacentre.org/${item.file_identifier_thumb}`,
                                                  audio: `https://content.sssmediacentre.org/${item.file_identifier}`,
                                                  duration: item.duration,
                                                  group: item.grouping,
                                                });
                                              }}
                                            >
                                              {
                                                <img
                                                  class="d-block w-100 effect7"
                                                  src={this.__(
                                                    `${item.file_identifier_thumb}`
                                                  )}
                                                  alt={item.title}
                                                  style={{ width: "100%" }}
                                                />
                                              }
                                            </div>
                                          </div>
                                          <div className="featuredContent">
                                            <h6
                                              className="badge text-dark"
                                              style={{ whiteSpace: "normal" }}
                                            >
                                              {item.title}
                                            </h6>
                                            <span>{item.catogory}</span>
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
                                No Audio Found!
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
                                {this.state.listenCategories.map((x) => {
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
