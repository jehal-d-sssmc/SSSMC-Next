import React from "react";

export default class Albumlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      albumId: "",
      albumData: "",
      extraLoading: false,
      albumlist: [],
      music: this.props.music
    }
  }

  __ = (url) => {
    try {
      let _url = new URL(url);
      return url;
    } catch (_) {
      return `https://content.sssmediacentre.org/${url}`;
    }
  };

  handleClick = async (e) => {
    e.preventDefault();
    this.props.redirect("/albums");
  };

  setMusic = async(attr = {}) => {
    this.music = this.state.music;
    this.music.musicList = [attr];
    
  
   this.music.player = true;
    this.music.index = 0;
    this.setState({
        music: this.music
    }, ()=> {
        this.props.togglePlayer(true);
      // this.props.setMusic(this.music, n);
    })
    
}

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let albumId = this.props.router.query.id;
    let albumData = await this.props.app.db(
      "GET",
      "findone",
      "audioplaylists",
      {
        _id: this.props.router.query.id,
      },
      {
        order: {},
      }
    );
    console.log(albumData);
    let albumlist = await this.props.app.db(
      "GET",
      "find",
      "audios",
      {
        category: albumData.data.playlistCondition.category[0],
      },
      {
        order: {},
      }
    );
    this.setState({
      albumData: albumData.data,
      albumId: albumId,
      loading: false,
      albumlist: albumlist
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
                                  this.props.redirect("/albums");
                                }}
                                href={"#"}
                              >
                                Albums
                              </a>
                            </li>
                            <li className="breadcrumb-item active">
                              <a href="#">{this.state.albumData.title}</a>
                            </li>
                          </>
                        </ol>
                      </nav>
                    </div>
                    <div className="p-2 card text-xl-center">
                      <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                            <img src={this.__(this.state.albumData.thumbnail)} />

                        </div>
                        <div className="col-md-9 align-self-center"><h1 className="fs-1">{this.state.albumData.title}</h1></div>
                      </div>
                      </div>
                      
                    </div>
                    <div className="p-3"></div>
                    <div className="main-read-album">
                      <ul className="albumlist listen">
                      {
                        this.state.albumlist.data !== undefined &&
                        this.state.albumlist.data.map((item)=>{
                   return <li className="listenItem">
                    <div className="listenImg" onClick={()=>{
                        this.setMusic({
                          name: `${item.title} | ${item.category}`,
                          author: item.album_name,
                          img: `https://content.sssmediacentre.org/${item.file_identifier_thumb}`,
                          audio: `https://content.sssmediacentre.org/${item.file_identifier}`,
                          duration: item.duration,
                          group: item.grouping
                        });
                        return false;
                      }} style={{cursor:"pointer"}}>
                      
                            <img
                              class="d-block w-100"
                              src={`https://content.sssmediacentre.org/${item.file_identifier_thumb}`}
                              alt={item.title}
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className='desc p-3'>
                            <div className='controls'>
                              <div className='row'>
                                <div className='col-2 text-start align-self-center play-control'>
                                  <span><i className="fa-solid fa-circle-play"></i></span>
                                </div>
                                <div className='col-8 text-center'>
                                  {item.title}
                                </div>
                                <div className='col-2 text-end align-self-center playlist-control'>
                                  <span>+<i class="fa-solid fa-music"></i></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        })
                      }
                      </ul>
                      
                    </div>
                    <div className="text-center loadMore">
                      <button
                        onClick={this.handleClick}
                        type="button"
                        class="mt-2 btn btn-danger"
                      >
                        Back to albums
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
