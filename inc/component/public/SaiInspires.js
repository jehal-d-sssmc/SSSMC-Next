import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      saiInspiresData: null,
    };
  }

  async componentDidMount() {
    let saiInspiresData = await this.props.app.db(
      "GET",
      "find",
      "saiinspires",
      {},
      {
        order: {
          publishDate: -1,
        },
        limit: 1,
      }
    );

    this.setState({
      loading: false,
      saiInspiresData: saiInspiresData,
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
          <div className="container pt-3 pb-4 mb-4">
            <div>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb pt-5">
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
                      <a href="#">Sai Inspires</a>
                    </li>
                  </>
                </ol>
              </nav>
            </div>

            <div className="sai-inspires-heading">
              <div className="text-center pt-5 pb-3 m-3">
                <h1>{this.state.saiInspiresData.data[0].title}</h1>
              </div>
            </div>
            <div className="pt-2 pb-2 mt-3 mb-3 sai-inspires-thumbnail container-md text-center">
              <img
                src={`https://content.sssmediacentre.org/${this.state.saiInspiresData.data[0].thumbnail}`}
                alt={""}
              />
            </div>
            <div className="sai-inspires-content container">
              <div className="main-read-article">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.saiInspiresData.data[0].description,
                  }}
                />
                <div>
                  <p className="fst-italic">
                    {this.state.saiInspiresData.data[0].info}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
}
