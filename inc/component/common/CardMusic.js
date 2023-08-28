import react from "react";
export default class CardMusic extends react.Component {

    constructor(props){
        super(props);
        this.state = this.props.app.musicRef.getMusic();
        console.log(this.props);
    } 
    
    __ = (url) => {
        try {
          let _url = new URL(url);
          return url;
        } catch (_) {
          return `https://content.sssmediacentre.org/${url}`;  
        }
      }
    
  togglePlaylist = (e) => {
    //console.log(this.props)
    this.setState({
      showlist: !this.state.showlist
    }, ()=> {
      this.props.app.musicRef.togglePlaylist(e);
    })
   
  }

  closePlayer = (e) => {
    this.setState({
      player: !this.state.player
    }, ()=> {
      this.props.app.musicRef.togglePlayer(e);
    });
  }

   async componentDidMount() {
    
     console.log(this.props.playerRef);
     /*let featuredItems = await this.props.app.db('GET', 'find', 'audios', {}, {
        order: {
            createdAt: -1
        }
    });*/
   }


   //shouldComponentUpdate = () => false;
  
    componentWillUnmount() {
     
    }
  /*
    updatePlayer = () =>{
      const { musicList, index, pause } = this.state;
      const currentSong = musicList[index];
      const audio = new Audio(currentSong.audio);
      this.props.playerRef.load();
      if(!pause){
        this.playOrPause()
      }
    }*/
    
    nextSong = () => {
      const { musicList, index, pause } = this.state;
    
      this.setState({ 
        index: (index + 1) % musicList.length
      }, ()=> {
       
      });
      this.props.app.musicRef.updatePlayer();
      if(pause){
        this.props.playerRef.play();
      }
    };
  
    prevSong = () => {
      const { musicList, index, pause } = this.state;  
      
      this.setState({ 
        index: (index + musicList.length - 1) % musicList.length
      }, ()=> {
        
      });
      this.props.app.musicRef.updatePlayer();
      if(pause){
        this.props.playerRef.play();
      }
    };
     
  
    playOrPause = () =>{
      this.props.app.musicRef.playOrPause();
    }
    
    clickAudio = (key) =>{
      
      const { pause } = this.state;
      this.props.setMusic(this.props.app.musicRef.getMusic(), key)
    //  console.log(key, this.props.getMusic)
      this.setState({
        index: key
      }, ()=> {
       
      });
      
      this.props.updatePlayer();
      if(pause){
       this.props.playerRef.play();
      }
    }
  
    
    render() {
      const { musicList, index, currentTime, pause, showlist } = this.props.app.musicRef.getMusic();
      const currentSong = musicList[index];
      return (
       <>
       {
        this.props.app.musicRef.getMusic().player &&
        <>

        
        <div className={`music${showlist ? "" : " d-none"}`}>
          <div className="card" style={{border:"none"}}>
            <div className="row" style={{width:"100vw"}}>
            <div className="col-md-6 text-center" style={{alignItems:"center", height:"calc(100vh - 130px)"}}>
              <div className="current-song">
                
                <div className="img-wrap">
                  <img src={ currentSong.img }/>
                </div>
              <div className="song-desc">
                <span className="song-name">{ currentSong.name }</span>
                <span className="song-autor">{ currentSong.author }</span>
              </div>
              <div className="timetrack">
              {
                  /*
                <div className="time">
                  <div className="current-time">{ currentTime }</div>
                  <div className="end-time">{ currentSong.duration === '-0.00' ? <i className="fa-solid fa-infinity"></i> : currentSong.duration }</div>
                </div>
                

                <div ref={ref => this.props.timelineRef = ref} className={`timeline${currentSong.duration === '-0.00'? ' d-none':''}`}>
                  <div ref={ref => this.props.playheadRef = ref} className="playhead"></div>
                  <div ref={ref => this.props.hoverPlayheadRef = ref} className="hover-playhead" data-content="0:00"></div>
                </div> */
                }
                {
                    currentSong.duration === '-0.00' &&
                    <div className="progress" style={{height:"5px"}}>
                        <div className={`progress-bar progress-bar-striped bg-danger${(!pause) ? '' : ' progress-bar-animated'}`} role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                }
              </div>
                
                <div className="controls">
                  <button onClick={this.prevSong} className="prev prev-next current-btn"><i className="fas fa-backward"></i></button>
                  
                  <button onClick={this.playOrPause} className="play current-btn">
                    {
                      (!pause) ? <i className="fas fa-play"></i>
                      :<i className="fas fa-pause"></i>
                    }
                  </button>
                  <button onClick={this.nextSong} className="next prev-next current-btn"><i className="fas fa-forward"></i></button>
                </div>
                
              </div>                  
                  </div>
            <div className="col-md-6 align-self-center">
            <div className="play-list" >
                
                <div className="hidePlaylist" onClick={this.togglePlaylist}><i className="fa-solid fa-xmark"></i></div>
                <div className="tracklist p-2">
                {this.props.app.musicRef.getMusic().musicList.map( (music, key) =>
                    <div key={key} 
                        onClick={()=>this.clickAudio(key)}
                        className={"track " + 
                        (index === key && !pause ?'current-audio':'') + 
                        (index === key && pause ?'play-now':'')} >
                        
                        <img className="track-img" src={music.img}/>
                        <div className="track-discr" >
                        <span className="track-name" >{music.name}</span>
                        <span className="track-author" >{music.author}</span>
                        </div>
                        <span className="track-duration" >
                        {(index === key)
                            ?currentTime
                            :music.duration === '-0.00' ? 'Stream' : music.duration
                        }
                        </span>
                    </div>
                )}
                </div>
              </div>
            </div>
            </div>    
          </div>
        </div>
        <div className="musicband">
        <section id="bottomplayer" className="ply_bar p-2">
          <div className="row" style={{width:"100%"}}>
            <div className="col-md-10 col-12 d-flex align-self-center" style={{alignItems:"center"}}>
              <div className="preview-img">
                <img src={ currentSong.img }/>
              </div>
              <div className="song-desc align-self-center">
                    <span className="song-name">{ currentSong.name }</span>
                    <span className="song-autor">{ currentSong.author }</span>
              </div>
             
              <div className="controls d-flex">
              <button onClick={this.prevSong} className="prev prev-next current-btn d-none d-md-flex"><i className="fas fa-backward"></i></button>
                
                <button onClick={this.playOrPause} className="play current-btn">
                  {
                    (!pause) ? <i className="fas fa-play"></i>
                    :<i className="fas fa-pause"></i>
                  }
                </button>
                <button onClick={this.nextSong} className="next prev-next current-btn d-none d-md-flex"><i className="fas fa-forward"></i></button>
                <button onClick={this.togglePlaylist} className="play current-playlist d-block d-md-none">
                  {
                    (!showlist) ? <i className="fa-solid fa-arrow-up"></i>
                    : <i className="fa-solid fa-arrow-down"></i>
                  }
                </button>
              </div>
              
            </div>
            <div className="col-md-2 align-self-center d-none d-md-flex" style={{justifyContent:"end", alignItems: "center"}}>
             
            <div className="controls">
              <div className="disc"></div>
              <button onClick={this.togglePlaylist} className="play current-playlist">
                {
                  (!showlist) ? <i className="fa-solid fa-arrow-up"></i>
                  : <i className="fa-solid fa-arrow-down"></i>
                }
              </button>
              <button onClick={this.closePlayer} className="play current-playlist">
                {
                  <i className="fa-solid fa-xmark"></i>
                }
              </button>
            </div>
            </div>
          </div>
          
        </section>

        </div>
        </>
       }
       </>
      )
    }
  }