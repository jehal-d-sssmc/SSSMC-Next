import App from 'next/app'
import React, { useEffect, useState } from 'react'

import '../styles/globals.css';
import '../styles/globals.scss';
import  '../styles/music.scss';


import client from '../inc/client'
import CardMusic from '../inc/component/common/CardMusic';
import Head from 'next/head';
/*
const withRouter = (props) => {
  return props => <Component {...props} params={useRouter()} />;
}*/


class MyApp extends React.Component{

  
  
  constructor(props){
    super(props);
    this.loader = <div className='preloader'>
      <img src='/loading.gif' alt='loader' />
      <div className="line"></div>
    </div>
    this.state = {
      loader: true,
      app: null,
      url: this.props.request.ref,
      search: {text:"", type: ""},
      music: {
        index: 0,
        currentTime: '0:00',
        player: false,
        musicList: [{name:'Asia Stream', author: 'Prasanthi Mandir', img: 'http://www.sssmediacentre.org/assets/images/radiostations/prasanthi.jpg', audio:'https://stream.sssmediacentre.org:8443/asia', duration: '0:00'}],
        pause: false,
        showlist: false
      }
      
    }
  }

  search = (find = {text: '', type: ''}, cb = () => {}) => {
    this.setState({
      search: find
    }, cb)
  }

  _setState = (obj, cb = () => {}) => {
    let _state = this.state;
    Object.entries(_state).forEach((x)=>{
      //if(obj[x[0]] !== undefined){
        obj[x[0]] = x[1];
      //}
    })
    this.setState(obj, cb);
  }
  

  redirect = (path) => {
   
    this.app.musicRef.togglePlaylist({}, false);
    this.setState({
      app: this.app
    }, ()=>{
      this.props.router.push(path, undefined, { shallow:true })
    })
  }

  
  componentDidMount() {
    let _app = (new client());
    _app.init(this.props.request, window).then((res)=>{
      _app.helper = res;
      _app.musicRef = _app.music(this);
      _app.voiceRef = _app.voice(this);
      
      
      this.setState({
        app: _app
      },()=>{
        this.app = this.state.app;
        this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
      this.playerRef.addEventListener("ended", this.nextSong, false);
        this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
      this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
      this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
      })
    });
  }

  componentWillUnmount(){
    
    this.timelineRef.removeEventListener("click", this.changeCurrentTime);
    this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
    this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
  }


  changeCurrentTime = (e) => {
    const duration = this.playerRef.duration;
    
    const playheadWidth = this.timelineRef.offsetWidth;
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
    console.log(duration);
    const userClickWidhtInPercent = (userClickWidht*100)/playheadWidth;
  
    this.playheadRef.style.width = userClickWidhtInPercent + "%";
    if(duration.toString() !== 'Infinity'){
      this.playerRef.currentTime = (duration * userClickWidhtInPercent)/100;
    }
  }
  
  hoverTimeLine = (e) => {
    const duration = this.playerRef.duration;
    console.log(duration)
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
    const duration = this.playerRef.duration;
    const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
    const playPercent = 100 * (this.playerRef.currentTime / duration);
      this.playheadRef.style.width = playPercent + "%";
    const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));  
    this.music = this.state.music;
    this.music.currentTime = currentTime;
    this.setState(this.music, () => {
     // console.log(this.state)
    })
  }
  
  formatTime = (currentTime) =>{
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
  
    seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;
    
    const formatTime = minutes + ":" +  seconds
   
    return formatTime;
    }

  render(){
    const Component = this.props.Component;
    const { musicList, index, currentTime, pause, showlist } = this.state.music;
    const currentSong = musicList[index];
    return (
      <>
      <Head>
        <meta name="viewport" content={`width=device-width, initial-scale=1`} />
        <title>Sri Sathya Sai Media Centre</title>
        <script>
           
        </script>
      </Head>
      {
        this.state.app === null ?
        <>{this.loader}</>:
        <>
        {
          <>
          <audio ref={ref => this.playerRef = ref}>
                    <source src={ this.state.music.player ? currentSong.audio : "" } type="audio/ogg"/>
                      Your browser does not support the audio element.
          </audio>
          <div className={`uni-timetrack${!this.state.music.player ? " d-none" : ""}`}>
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
          </>

        }
        <Component {...{attr: this.props.pageProps, app: this.state.app, loader: this.loader, router: this.props.router, redirect: this.redirect, state: this.state, search: this.search}} /> 
        <CardMusic {...{app: this.state.app}}   />
        </>
      }
      </>
    )
  }
}

MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context);
 let req = context.ctx.req;
  return { ...ctx, request: {
      host: req !== undefined ? req.headers.host : '',
      ref: req !== undefined ? req.headers.referer : '',
      protocol: req !==undefined && req.headers.referer !== undefined ? req.headers.referer.split("//")[0] : '',
      url: req !==undefined ? req.url : '',
      query: context.router.query,
      asPath: context.router.asPath,
      path: context.router.path,
      base: context.router.basePath,
      route: context.router.route
  } }
}

export default (MyApp);
