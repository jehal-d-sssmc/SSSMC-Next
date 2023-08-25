import React from "react";
import SearchForm from "../common/SearchForm";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default class Search extends React.Component {

    constructor(props){
        super(props);
        this.query = this.props.app.helper._query();
        this.search = this.query.s;
        this.state = {
            search: {},
            s: this.search,
            o: this.query.o,
            music: this.props.app.musicRef.getMusic()
        }
    }

    setMusic = async(attr = {}) => {
        this.music = this.state.music;
        this.music.musicList = [attr];
      // this.music.player = true;
        this.music.index = 0;
        this.setState({
            music: this.music
        }, ()=> {
          this.props.app.musicRef.togglePlayer(true);
          // this.props.setMusic(this.music, n);
        });
        
    }

    searchdata = async (s, type = '') => {
        console.log(type, s);
        this.setState({
            search: {}
        });
        switch(type){
            case 'audio':
                this.setState({
                    search: {
                       audios: await this.props.app.db(
                            "GET",
                            "find",
                            "audios",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          )
                    }
                });
            break;
            case 'video':
                this.setState({
                    search: {
                        videos: await this.props.app.db(
                            "GET",
                            "find",
                            "videos",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          )
                    }
                });
            break;
            case 'article':
                this.setState({
                    search: {
                        articles: await this.props.app.db(
                            "GET",
                            "find",
                            "articles",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          )
                    }
                });
            break;
            case 'download':
                this.setState({
                    search: {
                        downloads: await this.props.app.db(
                            "GET",
                            "find",
                            "galleries",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          )
                    }
                });
            break;
            default:
                this.setState({
                    search: {
                        videos: await this.props.app.db(
                            "GET",
                            "find",
                            "videos",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          ),
                        audios: await this.props.app.db(
                            "GET",
                            "find",
                            "audios",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          ),
                        articles: await this.props.app.db(
                            "GET",
                            "find",
                            "articles",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          ),
                        downloads: await this.props.app.db(
                            "GET",
                            "find",
                            "galleries",
                            {
                              $or: [
                                {title: { $regex: `.*${s}.*`, $options: 'i' }},
                                {category: { $regex: `.*${s}.*`, $options: 'i' }},
                              ]
                            },
                            {
                              order: {
                                createdAt: -1,
                              },
                            }
                          )
                    }
                })
            break;
        }
    }

    async componentDidMount(){
        let type = this.query.o;
        await this.searchdata(this.state.s, type)
    }



    

    render(){
        return <main>
            <div className="p-3"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <SearchForm {...this.props} query={this.query} searchdata={this.searchdata} />
                        <hr />
                    </div>
                    <div className="col-12">
                        {
                            this.state.s !== undefined &&
                            <>
                            <div><h3 className="page-title text-blue">Searching For: <span className="display-6 text-danger">{this.props.state.search.text}</span> {this.props.state.search.type !== '' ? 'in ' + this.props.state.search.type : ""}</h3></div>
                            <hr />
                        </>
                        }
                        {
                            this.state.search.videos !== undefined && this.state.search.videos.data !== undefined && this.state.search.videos.data.length > 0 &&
                            <>
                                <div>
                                    <h5 className="section-title">Videos</h5>
                                    &nbsp; &gt; &nbsp;
                                    <a
                                    onClick={() => {
                                        this.props.redirect("/videos");
                                        this.forceUpdate();
                                    }}
                                    href={"#"}
                                    className="text-danger"
                                    >
                                    View More
                                    </a>
                                </div>
                                
                                <hr />
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className="my-masonry-grid"
                                    columnClassName="my-masonry-grid_column"
                                    >
                                    {
                                        this.state.search.videos.data.map((item,i)=>{
                                            return (
                                            <div className="card text-center my-masonry-grid_column p-2"
                                                    style={{ borderRadius: "15px", border:"none" }}>
                                                <div className="position-relative"><div className={`ratio ratio-${item.category.toLowerCase() === 'shorts' ? '9x16' : '4x3'}`}>
                                                    <div className="stretch">
                                                        <a href={item.file_url} className="fancybox" data-fancybox="true" flink="f_videos" data-caption={item.title}>
                                                            <img src={item.thumb_path} onError={(e)=>{
                                                                e.target.onError = null;
                                                                const urlSearchParams = new URL(item.file_url);
                                                                const params = url.searchParams !== undefined ? Array.from(url.searchParams.entries()) : [];
                                                                if(params.v !== undefined){
                                                                    e.target.src = `https://img.youtube.com/vi/${params.v}/hqdefault.jpg`
                                                                }else{
                                                                    e.target.src = `https://picsum.photos/200/300`;
                                                                }
                                                            }} alt={item.title} />
                                                        </a>
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
                                    }
                                </Masonry>
                            </>
                        }
                        {
                            this.state.search.audios !== undefined && this.state.search.audios.data !== undefined && this.state.search.audios.data.length > 0 &&
                            <>
                                <div>
                                    <h5 className="section-title">Audios</h5>
                                    &nbsp; &gt; &nbsp;
                                    <a
                                    onClick={() => {
                                        this.props.redirect("/audios");
                                        this.forceUpdate();
                                    }}
                                    href={"#"}
                                    className="text-danger"
                                    >
                                    View More
                                    </a>
                                </div>
                                <hr />

                                <div className="row">
                                    {
                                        this.state.search.audios.data.map((item,i)=>{
                                            return <div className="col-md-3 col-sm-4 mb-2">
                                                <div className="featuredItem ratio ratio-16x9" style={{cursor:"pointer"}}>
                                                    <div className="featuredImg" onClick={()=>{
                                                        this.setMusic({
                                                            name: `${item.title} | ${item.audioType}`,
                                                            author: item.album_name,
                                                            img: `https://content.sssmediacentre.org/${item.file_identifier_thumb}`,
                                                            audio: `https://content.sssmediacentre.org/${item.file_identifier}`,
                                                            duration: item.duration,
                                                            group: item.grouping
                                                        });
                                                    }}>
                                                    
                                                    <img
                                                        className="d-block w-100"
                                                        src={`https://content.sssmediacentre.org/${item.file_identifier_thumb}`}
                                                        alt={item.title}
                                                        style={{ width: "100%" }}
                                                    />
                                                    </div>
                                                   
                                                </div>
                                                <div className="featuredContent">
                                                        <h5>{item.title}</h5>
                                                        <span>{item.category}</span>
                                                </div>
                                                <div className="mb-2"></div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                        }
                        {
                            this.state.search.articles !== undefined && this.state.search.articles.data !== undefined && this.state.search.articles.data.length > 0 &&
                            <>
                                <div>
                                    <h5 className="section-title">Articles</h5>
                                    &nbsp; &gt; &nbsp;
                                    <a
                                    onClick={() => {
                                        this.props.redirect("/read");
                                        this.forceUpdate();
                                    }}
                                    href={"#"}
                                    className="text-danger"
                                    >
                                    View More
                                    </a>
                                </div>
                                <hr />
                                <div className="row">
                                    {
                                        this.state.search.articles.data.map((item,i)=>{
                                            return <div className="col-md-3 col-sm-4 mb-2">
                                                <div className="featuredItem ratio ratio-16x9">
                                                    <div className="featuredImg" style={{cursor:"pointer"}}>
                                                    <a onClick={()=>{
                                                        this.props.redirect(`/read/${item._id}`);
                                                        
                                                    }}>
                                                    <img
                                                        className="d-block w-100"
                                                        src={`https://content.sssmediacentre.org/${item.thumbPath}`}
                                                        alt={item.title}
                                                        style={{ width: "100%" }}
                                                        />
                                                    </a>
                                                    </div>
                                                </div>
                                                <div className="featuredContent">
                                                        <h5>{item.title}</h5>
                                                        <span>{item.category}</span>
                                                </div>
                                                <div className="mb-2"></div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                        }
                        {
                            this.state.search.downloads !== undefined && this.state.search.downloads.data !== undefined && this.state.search.downloads.data.length > 0 &&
                            <>
                                <div>
                                    <h5 className="section-title">Downloads</h5>
                                    &nbsp; &gt; &nbsp;
                                    <a
                                    onClick={() => {
                                        this.props.redirect("/downloads");
                                        this.forceUpdate();
                                    }}
                                    href={"#"}
                                    className="text-danger"
                                    >
                                    View More
                                    </a>
                                </div>
                                <hr />
                                <div className="row">
                                    {
                                        this.state.search.downloads.data.map((item,i)=>{
                                            return <div className="col-md-3 col-sm-4 mb-2">
                                                <div className="featuredItem ratio ratio-16x9">
                                                    <div className="featuredImg">
                                                    <a href={item.file_url} className="fancybox" data-fancybox="true" flink="f_gallery" data-caption={item.title}>
                                                    <img
                                                        className="d-block w-100"
                                                        src={`https://content.sssmediacentre.org/${item.imagePath}`}
                                                        alt={item.title}
                                                        style={{ width: "100%" }}
                                                    />
                                                    </a>
                                                    </div>
                                                </div>
                                                <div className="featuredContent">
                                                        <h5>{item.title}</h5>
                                                        <span>{item.category}</span>
                                                    </div>
                                                <div className="mb-2"></div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="p-3"></div>
        </main>
    }
}