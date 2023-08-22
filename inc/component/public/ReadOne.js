import React from "react";

export default class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articleId: "",
      articleData: "",
      extraLoading: false,
    };
  }

  handleClick = async (e) => {
    e.preventDefault();
    this.props.redirect("/read");
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let articleId = this.props.router.query.id;
    let articleData = await this.props.app.db(
      "GET",
      "findone",
      "articles",
      {
        _id: this.props.router.query.id,
      },
      {
        order: {},
      }
    );
    this.setState({
      articleData: articleData.data,
      articleId: articleId,
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
            <section className="main-read">
              <div className="container-lg">
                {this.state.loading ? (
                  <>{this.props.loader}</>
                ) : (
                  <>
                    <div>
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb p-2">
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
                                  this.props.redirect("/read");
                                }}
                                href={"#"}
                              >
                                Read
                              </a>
                            </li>
                            <li className="breadcrumb-item active">
                              <a href="#">{this.state.articleData.title}</a>
                            </li>
                          </>
                        </ol>
                      </nav>
                    </div>
                    <div className="pt-5 text-xl-center">
                      <h1 className="fs-1">{this.state.articleData.title}</h1>
                    </div>
                    <div className="main-read-article">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.articleData.customTemplate,
                        }}
                      />
                    </div>
                    <div className="text-center loadMore">
                      <button
                        onClick={this.handleClick}
                        type="button"
                        class="mt-2 btn btn-danger"
                      >
                        Back to Articles
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