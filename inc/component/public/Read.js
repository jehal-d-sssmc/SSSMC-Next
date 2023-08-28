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
      selectedCategory: this.props.cat,
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
    if(typeof(e) !== 'string'){
      e.preventDefault();

    }
    this.setState({
      categoryEmpty: false,
      selectedReadItems: [],
      selectedReadIndex: 0,
      selectedCategory: typeof(e) !== 'string' ? e.target.text : e,
      viewMoreDisabledState: false,
    });

    if (typeof(e) !== 'string' && e.target.text === "All") {
      this.setState({
        readIndex: 0,
        readItems: [],
      });
      let againReadItems = await this.props.app.db(
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
      this.setState({
        readItems: againReadItems.data,
        readIndex: 1,
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
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      );
      this.setState({
        selectedCategory: decodeURI(url.replace('/read?cat=', ''))
      }, async() => {
      
          await this.handleCatClick(this.state.selectedCategory);

      })
      console.log(this.props.router.state)
    }
 
    this.props.router.events.on('routeChangeStart', handleRouteChange)
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

    let ReadItems = {};
    if (this.state.selectedCategory === "All") {
      ReadItems = await this.props.app.db(
        "GET",
        "find",
        "articles",
        {},
        {
          order: {
            createdAt: -1,
          },
          limit: 18,
        }
      );
      this.setState({
        readItems: ReadItems.data,
        readIndex: 1,
      });
      this.forceUpdate();
    } else {
      ReadItems = await this.props.app.db(
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
          limit: 18,
        }
      );
      this.setState({
        selectedReadItems: ReadItems.data,
        selectedReadIndex: 1,
      });
      this.forceUpdate();
    }

    let readCategories = await this.props.app.db(
      "GET",
      "find",
      "articlecategories",
      { nameTree: { $size: 0 } },
      {
        order: {},
        limit: 8,
      }
    );
    this.forceUpdate();

    this.setState({
      loading: false,
      readCategories: readCategories.data,
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
                                    this.props.redirect("/read?cat=All");
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
                      <div className="col-md-9 col-lg-10">
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
                                            className="text-center my-masonry-grid_column p-2"
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
                                          className="text-center my-masonry-grid_column p-2"
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

                      <div className="col-md-3 col-lg-2">
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
                              <h5 className="m-0 p-3 pb-0 pt-0">Categories</h5>
                            </div>
                            <div className="card-body p-3">
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
