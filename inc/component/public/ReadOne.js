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
    console.log(articleData);
    this.setState(
      {
        articleData: articleData.data,
        articleId: articleId,
        loading: false,
      },
      () => {
        console.log(this.state.articleId, this.state.articleData);
      }
    );
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
                        class="btn btn-danger"
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
