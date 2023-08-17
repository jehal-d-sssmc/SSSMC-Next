import React from "react";


import Masonry from 'react-masonry-css';
import SwiperComp from "../Home/SwiperComp";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export default class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      featuredItems: [],
      shorts: [],
      listen: [],
      read: [],
    };
  }

  __ = (url) => {
    try {
      let _url = new URL(url);
      return url;
    } catch (_) {
      return `https://content.sssmediacentre.org/${url}`;  
    }
  }

  async componentDidMount() {
    console.log(this.props);
    console.log(this.props);
    let featuredItems = await this.props.app.db('GET', 'find', 'videos', {
        $and: [
            {isFeatureActive: true}
        ]
    }, {
        order: {
            createdAt: -1
        }
    });

    let categories = await this.props.app.db('GET', 'find', 'videocategories', {}, {
        order: {
          catogoryName: 1
        },
        limit: 1000
    })
    
      let category = [];
      category = categories.data.filter((x)=>{
        return x.nameTree !== undefined && x.nameTree.length < 1
      });

      category.forEach((x)=>{
        x.children = categories.data.filter((i)=>{
          x.catogoryId === i.parent
        })
      });

      let videos = await this.props.app.db('GET', 'find', 'videos', {}, {
          order: {
              createdAt: -1
          },
          limit: 24
      });
      console.log(category);
        //if(featuredItems.type === success){
            this.setState({
                videos: videos,
                featuredItems: featuredItems,
                loading: false,
                category: category
            })
        //}
        
        this.forceUpdate();
  //  this.forceUpdate();
      
    //console.log(featuredItems);
  }

 shouldComponentUpdate = () => false;

  render() {
    return (
      <main>
        {this.state.loading ? (
          <>{this.props.loader}</>
        ) : (
         <>
         <section id="" className="">
          <div className="p-2"></div>
          <div style={{ margin: '0 15px' }}>
              <SwiperComp classname="fvideo" featuredItems={this.state.featuredItems} />
          </div>
          </section>
          <div className="container">
            <div className="p-3"></div>
           
            <div className="row">
              
              <div className="col-md-8 col-lg-9">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li className="breadcrumb-item"><a href={this.props.app.helper.siteUrl}>Home</a></li>
                  <li className="breadcrumb-item active"><a href="#">Watch</a></li>
                </ol>
              </nav>
              <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
                {
                  this.state.videos.type !== "success" ? (
                    <div className="alert alert-error">{props.read.msg}</div>
                  ) :
                  this.state.videos.data.map((item, i) => {
                    return (
                    
                      <div key={i} className="card text-center my-masonry-grid_column p-2" style={{borderRadius:"15px"}} >
                          
                          <div className="position-relative" >
                            <div className={item.category !== 'Shorts' ? `ratio ratio-4x3` : `ratio ratio-9x16`}>
                              <div className="stretch">
                              {
                              <a href={item.file_url} class="fancybox" data-fancybox="true" flink="f_videos" data-caption={item.title}>
                                <img
                                  class="d-block w-100"
                                  src={this.__(`${item.thumb_path}`)}
                                  alt={item.title}
                                  style={{ width: "100%" }}
                                />
                              </a>
                              }
                              </div>
                            </div>
                              <div className='featuredContent'>
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
              </div>

              <div className="col-md-4 col-lg-3">
                <div className="position-sticky" style={{top:"90px", overflow: "auto", maxHeight:"85vh"}}>
                  <div className="card">
                  <div className="card-header">
                    <h5 className="m-0">Search</h5>
                  </div>
                  <div className="card-body">
                    
                    <input type="text" className="form-control" placeholder="Search" />
                  </div>
                </div>
                <div className="p-2"></div>
                <div className="card">
                  <div className="card-header">
                    <h5 className="m-0">Categories</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {
                        this.state.category.map((x)=>{
                          return <li className="list-group-item"><a href={`#${x.catogoryName}`}>{x.catogoryName}</a></li>
                        })
                      }
                    </ul>
                  </div>
                </div>
                
                </div>
              </div>
            </div>
          </div>
         </>
        )}
      </main>
    );
  }
}
