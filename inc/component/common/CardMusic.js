import react from "react";
export default class CardMusic extends react.Component {

    constructor(props){
        super(props);
        this.state = this.props.getMusic;
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
      this.props.togglePlaylist(e);
    })
   
  }

  closePlayer = (e) => {
    this.setState({
      player: !this.state.player
    }, ()=> {
      this.props.togglePlayer(e);
    });
  }

   async componentDidMount() {
    if(this.state.player){
      this.props.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
      this.props.playerRef.addEventListener("ended", this.nextSong, false);
      this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
      this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
      this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
    }
     
     /*let featuredItems = await this.props.app.db('GET', 'find', 'audios', {}, {
        order: {
            createdAt: -1
        }
    });*/
   }


   //shouldComponentUpdate = () => false;
  
    componentWillUnmount() {
      if(this.state.player){
        this.props.playerRef.removeEventListener("timeupdate", this.timeUpdate);
        this.props.playerRef.removeEventListener("ended", this.nextSong);
        this.timelineRef.removeEventListener("click", this.changeCurrentTime);
        this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
        this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);

      }
    }
  
  changeCurrentTime = (e) => {
    const duration = this.props.playerRef.duration;
    
    const playheadWidth = this.timelineRef.offsetWidth;
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
   
    const userClickWidhtInPercent = (userClickWidht*100)/playheadWidth;
  
    this.playheadRef.style.width = userClickWidhtInPercent + "%";
    if(duration.toString() !== 'Infinity'){
      this.props.playerRef.currentTime = (duration * userClickWidhtInPercent)/100;

    }
  }
  
  hoverTimeLine = (e) => {
    const duration = this.props.playerRef.duration;
    
    const playheadWidth = this.timelineRef.offsetWidth
    
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
    const userClickWidhtInPercent = (userClickWidht*100)/playheadWidth;
  
    if(userClickWidhtInPercent <= 100){
      this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
    }
    
    const time = (duration * userClickWidhtInPercent)/100;
    
    if( (time >=0) && (time <= duration)){
      this.hoverPlayheadRef.dataset.content = this.formatTime(time);
    }
  }
  
  resetTimeLine = () => {
    this.hoverPlayheadRef.style.width = 0;
  }
  
  timeUpdate = () => {
    const duration = this.props.playerRef.duration;
    const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
    const playPercent = 100 * (this.props.playerRef.currentTime / duration);
      this.playheadRef.style.width = playPercent + "%";
    const currentTime = this.formatTime(parseInt(this.props.playerRef.currentTime));  
    this.setState({ 
      currentTime 
    }, ()=> {
     
    });
  }
  
  formatTime = (currentTime) =>{
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
  
    seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;
    
    const formatTime = minutes + ":" +  seconds
   
    return formatTime;
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
      this.props.updatePlayer();
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
      this.props.updatePlayer();
      if(pause){
        this.props.playerRef.play();
      }
    };
     
  
    playOrPause = () =>{
      this.props.playOrPause();
    }
    
    clickAudio = (key) =>{
      
      const { pause } = this.state;
      this.props.setMusic(this.props.getMusic, key)
      console.log(key, this.props.getMusic)
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
      const { musicList, index, currentTime, pause, showlist } = this.props.getMusic;
      const currentSong = musicList[index];
      return (
       <>
       {
        this.props.getMusic.player &&
        <>

        
        <div className={`music${showlist ? "" : " d-none"}`}>
          <div className="card" style={{border:"none"}}>
            <div className="row" style={{width:"100vw"}}>
            <div className="col-md-6 align-self-center text-center" style={{alignItems:"center", height:"calc(100vh - 130px)"}}>
              <div className="current-song">
                
                <div className="img-wrap">
                  <img src={ currentSong.img }/>
                </div>
              <div className="song-desc">
                <span className="song-name">{ currentSong.name }</span>
                <span className="song-autor">{ currentSong.author }</span>
                
              </div>
              <div className="timetrack">
              <div className="time">
                  <div className="current-time">{ currentTime }</div>
                  <div className="end-time">{ currentSong.duration === '-0.00' ? <i className="fa-solid fa-infinity"></i> : currentSong.duration }</div>
                </div>
                
                <div ref={ref => this.timelineRef = ref} className={`timeline${currentSong.duration === '-0.00'? ' d-none':''}`}>
                  <div ref={ref => this.playheadRef = ref} className="playhead"></div>
                  <div ref={ref => this.hoverPlayheadRef = ref} className="hover-playhead" data-content="0:00"></div>
                </div>
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
                {this.state.musicList.map( (music, key) =>
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
              <div className="timetrack d-none d-md-block">
                <div className="time">
                    <div className="current-time">{ currentTime }</div>
                    <div className="end-time">{ currentSong.duration === '-0.00' ? <i className="fa-solid fa-infinity"></i> : currentSong.duration  }</div>
                  </div>
                  {
                    currentSong.duration === '-0.00' ? 
                    <div className="progress" style={{height:"5px"}}>
                        <div className={`progress-bar progress-bar-striped${(!pause) ? ' bg-info' : ' bg-danger progress-bar-animated'}`} role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> :
                    <div ref={ref => this.timelineRef = ref} className="timeline">
                      <div ref={ref => this.playheadRef = ref} className="playhead"></div>
                      <div ref={ref => this.hoverPlayheadRef = ref} className="hover-playhead" data-content="0:00"></div>
                    </div>
                  } 
                  
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