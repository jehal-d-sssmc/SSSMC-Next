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
      readIndex: 0,
    };
  }

  handleClick = async (e) => {
    e.preventDefault();
    this.setState({
      extraLoading: true,
    });
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
    console.log(extraReadItems);
    let curItems = this.state.readItems;
    let curIndex = this.state.readIndex;
    curIndex++;
    console.log(curItems);
    extraReadItems.data.forEach((item) => {
      curItems.push(item);
    });
    this.setState(
      {
        readItems: curItems,
        readIndex: curIndex,
      },
      () => {
        this.setState({
          extraLoading: false,
        });
        console.log(this.state.readItems, this.state.readIndex);
      }
    );
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
    this.setState(
      {
        featuredReadItems: featuredReadItems.data,
      },
      () => {
        console.log(this.state.featuredReadItems);
      }
    );
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
    console.log(readItems);
    this.setState(
      {
        readItems: readItems.data,
        readIndex: 1,
      },
      () => {
        console.log(this.state.readItems);
      }
    );
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
            <section className="featured-read">
              <div className="p-4">
                <SwiperComp featuredItems={this.state.featuredReadItems} />
              </div>
            </section>
            <section className="main-read">
              <div className="container-lg">
                {this.state.loading ? (
                  <>{this.props.loader}</>
                ) : (
                  <>
                    <h1>Articles</h1>
                    <div className="main-read-masonry">
                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {this.state.readItems.map((item, i) => {
                          return (
                            <a
                              href={`#`}
                              onClick={() => {
                                this.props.redirect(`/read/${item._id}`);
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
                    </div>
                    <div className="text-center loadMore">
                      <button
                        onClick={this.handleClick}
                        type="button"
                        class="btn btn-secondary"
                      >
                        View More
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    );
  }
}
