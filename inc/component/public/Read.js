import React from "react";
import SwiperComp from "../Read/SwiperComp";

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      extraLoading: false,
      featuredReadItems: [],
      readItems: [],
      selectedReadItems: [],
      readIndex: 0,
      selectedReadIndex: 0,
      readCategories: [],
      selectedCategory: "All",
      categoryEmpty: false,
      viewMoreDisabledState: false,
    };
  }

  handleClick = async (e) => {
    e.preventDefault();

    if (this.state.selectedCategory === "All") {
      let extraReadItems = await this.props.app.db(
        "GET",
        "find",
        "articles",
        {},
        {
          order: {
            createdAt: -1,
          },
          limit: 15,
          skip: this.state.readIndex * 15,
        }
      );

      let curItems = this.state.readItems;
      let curIndex = this.state.readIndex;
      curIndex++;
      extraReadItems.data.forEach((item) => {
        curItems.push(item);
      });
      this.setState({
        readItems: curItems,
        readIndex: curIndex,
      });
      this.forceUpdate();

      if (extraReadItems.data.length < 15) {
        this.setState({
          viewMoreDisabledState: true,
        });
        this.forceUpdate();
        return;
      }
    } else {
      let extraReadItems = await this.props.app.db(
        "GET",
        "find",
        "articles",
        {
          categoryName: this.state.selectedCategory,
        },
        {
          order: {
            createdAt: -1,
          },
          limit: 15,
          skip: this.state.selectedReadIndex * 15,
        }
      );

      let curSelIndex = this.state.selectedReadIndex;
      let curSelItems = this.state.selectedReadItems;
      curSelIndex++;
      extraReadItems.data.forEach((item) => {
        curSelItems.push(item);
      });
      this.setState({
        selectedReadItems: curSelItems,
        selectedReadIndex: curSelIndex,
      });
      this.forceUpdate();

      if (extraReadItems.data.length < 15) {
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
      selectedReadItems: [],
      selectedReadIndex: 0,
      selectedCategory: e.target.text,
      viewMoreDisabledState: false,
    });

    if (this.state.selectedCategory === "All") {
      this.setState({
        selectedCategory: "All",
      });
      this.forceUpdate();
      return;
    }

    let selReadItems = await this.props.app.db(
      "GET",
      "find",
      "articles",
      {
        categoryName: this.state.selectedCategory,
      },
      {
        order: {
          createdAt: -1,
        },
        limit: 15,
        skip: this.state.selectedReadIndex * 15,
      }
    );

    if (selReadItems.data.length === 0) {
      this.setState({
        categoryEmpty: true,
      });
      this.forceUpdate();
      return;
    }

    let curSelIndex = this.state.selectedReadIndex;
    let curSelItems = this.state.selectedReadItems;
    curSelIndex++;
    selReadItems.data.forEach((item) => {
      curSelItems.push(item);
    });
    this.setState({
      selectedReadItems: curSelItems,
      selectedReadIndex: curSelIndex,
    });
    this.forceUpdate();
  };

  async componentDidMount() {
    let featuredReadItems = await this.props.app.db(
      "GET",
      "find",
      "articles",
      {
        $and: [{ isFeatureActive: true }],
      },
      {
        order: {
          createdAt: -1,
        },
        limit: 7,
      }
    );
    this.setState({
      featuredReadItems: featuredReadItems.data,
    });
    this.forceUpdate();

    let readItems = await this.props.app.db(
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
      readItems: readItems.data,
      readIndex: 1,
    });
    this.forceUpdate();

    let readCategories = await this.props.app.db(
      "GET",
      "find",
      "articlecategories",
      {},
      {}
    );
    this.setState({
      readCategories: readCategories.data,
    });
    this.forceUpdate();

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
              <section className="featured-read">
                <div className="p-4">
                  <SwiperComp
                    {...this.props}
                    featuredItems={this.state.featuredReadItems}
                  />
                </div>
              </section>
              <section className="main-read p-4">
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
                                <a href="#">Read</a>
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
                                    this.props.redirect("/read");
                                    this.forceUpdate();
                                  }}
                                  href={"#"}
                                >
                                  Read
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
                      <h1>Articles</h1>
                    </div>

                    <div className="row">
                      <div className="col-md-8 col-lg-9">
                        <div className="main-read-masonry">
                          {!this.state.categoryEmpty ? (
                            <Masonry
                              breakpointCols={breakpointColumnsObj}
                              className="my-masonry-grid"
                              columnClassName="my-masonry-grid_column"
                            >
                              {this.state.selectedCategory != "All"
                                ? this.state.selectedReadItems.map(
                                    (item, i) => {
                                      return (
                                        <a
                                          href={`#`}
                                          onClick={() => {
                                            this.props.redirect(
                                              `/read/${item._id}`
                                            );
                                          }}
                                          data-caption={item.title}
                                        >
                                          <div
                                            className="card text-center my-masonry-grid_column p-2"
                                            style={{ borderRadius: "15px" }}
                                          >
                                            <div className="preview-img">
                                              {
                                                <img
                                                  class="d-block w-100"
                                                  src={`https://content.sssmediacentre.org/${item.thumbPath}`}
                                                  alt={item.title}
                                                  style={{ width: "100%" }}
                                                />
                                              }
                                            </div>
                                            <div className="featuredContent">
                                              <h5>{item.title}</h5>
                                            </div>
                                          </div>
                                        </a>
                                      );
                                    }
                                  )
                                : this.state.readItems.map((item, i) => {
                                    return (
                                      <a
                                        href={`#`}
                                        onClick={() => {
                                          this.props.redirect(
                                            `/read/${item._id}`
                                          );
                                        }}
                                        data-caption={item.title}
                                      >
                                        <div
                                          className="card text-center my-masonry-grid_column p-2"
                                          style={{ borderRadius: "15px" }}
                                        >
                                          <div className="preview-img">
                                            {
                                              <img
                                                class="d-block w-100"
                                                src={`https://content.sssmediacentre.org/${item.thumbPath}`}
                                                alt={item.title}
                                                style={{ width: "100%" }}
                                              />
                                            }
                                          </div>
                                          <div className="featuredContent">
                                            <h5>{item.title}</h5>
                                          </div>
                                        </div>
                                      </a>
                                    );
                                  })}
                            </Masonry>
                          ) : (
                            <div className="empty-category text-center">
                              <h4 className="pt-2 pb-2 text-secondary">
                                No Articles Found!
                              </h4>
                            </div>
                          )}
                        </div>
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
                                {this.state.readCategories.map((x) => {
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
