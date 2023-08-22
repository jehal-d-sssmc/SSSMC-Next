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
    console.log(this.props.request)
    this.state = {
      loader: true,
      app: null,
      url: this.props.request.ref,
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
  

  redirect = (path) => {
    this.togglePlaylist({}, false);
      this.props.router.push(path, undefined, { shallow:true })
  }

  togglePlaylist = (e, hide = null) => {
    let music = this.state.music;
     music.showlist = hide === null ? !music.showlist : hide;
    this.setState({
      music: music
    })
    // console.log(music);
   }

   updatePlayer = async () =>{
    const { musicList, index, pause } = this.state.music;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    await this.playerRef.load();
    let music = this.state.music;
   // console.log(music);
    
    if(!pause){
      this.playerRef.pause();
    }else{
      this.playerRef.play();
    }
    music.pause = pause;
    this.setState({
      music: music
    })
  }

  playOrPause = () =>{
     
    const { musicList, index, pause } = this.state.music;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    let music = this.state.music;
    if( !pause ){
      this.playerRef.play();
    }else{
      this.playerRef.pause();
    }
    music.pause = !pause;
    this.setState({
      music: music
    })
  }

   togglePlayer = (e) => {
    let music = this.state.music;
    
     music.player = e === true ? e : !music.player;
     music.pause = music.player;
     this.setState({
      music: music
    }, () => {
      console.log(music);
      if(!music.player){
        this.playerRef.pause();
        this.togglePlaylist({}, false);
      }
      this.updatePlayer();
    })
    // console.log(music);
   }
  
   setMusic = (_music, index = 0) => {
    
    if(_music !== undefined && _music.musicList !== undefined){
        if(!Array.isArray(_music.musicList)){
          mstate.musicList = _music.data.map((x)=>{
              return {
                  name: x.title,
                  author: x.category,
                  img: x.file_identifier_thumb !== undefined ? this.__(x.file_identifier_thumb) : '/default-music.png',
                  audio:this.__(x.file_identifier),
                  duration: x.duration
              }
          });
        }
        
    }
    _music.index = index;
    _music.player = true;
    _music.pause = false;
    console.log(_music)
    this.setState({
      music: _music
    }, () => {
      this.updatePlayer();
    })
    
  }

  componentDidMount() {
    let _app = (new client());
    _app.init(this.props.request, window).then((res)=>{
      _app.helper = res;
      this.setState({
        app: _app
      })
    })
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
          
          <audio ref={ref => this.playerRef = ref}>
                    <source src={ this.state.music.player ? currentSong.audio : "" } type="audio/ogg"/>
                      Your browser does not support the audio element.
          </audio>

        }
        <Component {...{attr: this.props.pageProps, app: this.state.app, loader: this.loader, router: this.props.router, redirect: this.redirect, setMusic: this.setMusic, music: this.state.music, togglePlayer: this.togglePlayer}} /> 
        <CardMusic {...{setMusic: this.setMusic, getMusic: this.state.music, togglePlaylist: this.togglePlaylist, togglePlayer: this.togglePlayer, playerRef: this.playerRef, updatePlayer: this.updatePlayer, playOrPause: this.playOrPause}} />
        </>
      }
      </>
    )
  }
}
/*
function MyApp({ Component, pageProps, request }) {
  const loader = <div className='preloader'>
    <img src='/loading.gif' alt='loader' />
    <div className="line"></div>
  </div>
  const [app, setApp] = useState(null);
  const [music, setMusic] = useState({
    index: 0,
    currentTime: '0:00',
    player: false,
    musicList: [{name:'Asia Stream', author: 'Prasanthi Mandir', img: 'http://www.sssmediacentre.org/assets/images/radiostations/prasanthi.jpg', audio:'https://stream.sssmediacentre.org:8443/asia', duration: '0:00'}],
    pause: false,
    showlist: false
  });
  const router = useRouter()
  const redirect = (path) => {
      router.push(path, undefined, { shallow:true })
  }

  const togglePlaylist = (e) => {
   // console.log(music);
    music.showlist = !music.showlist;

    setMusic(music);
   // console.log(music);
  }

  const closePlayer = (e) => {
    // console.log(music);
     music.player = !music.player;
 
     setMusic(music);
    // console.log(music);
   }
  
  const _setMusic = (_music = music, index = 0) => {
    let mstate = _music;
    
    if(_music !== undefined && _music.musicList !== undefined){
        if(!Array.isArray(_music.musicList)){
          mstate.musicList = _music.data.map((x)=>{
              return {
                  name: x.title,
                  author: x.category,
                  img: x.file_identifier_thumb !== undefined ? this.__(x.file_identifier_thumb) : '/default-music.png',
                  audio:this.__(x.file_identifier),
                  duration: x.duration
              }
          });
        }
        
    }
    mstate.player = true;
   // console.log(mstate)
    setMusic(mstate);
    
  }

  const playOrPause = () =>{     
    const { musicList, index, pause } = music;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    if( !pause ){
      playerRef.play();
    }else{
      playerRef.pause();
    }
    let _music = music;
    _music.pause = !_music.pause;
    setMusic(_music);
  }
 // console.log("8.)",_client);
  useEffect(()=>{
    let _app = (new client());
    _app.init(request, window).then((res)=>{
      
      _app.helper = res;
      setApp(_app);
    })
    
  },[app])
  
  
  return <>
  <Head>
  <meta name="viewport" content={`width=device-width, initial-scale=1`} />
  <title>Sri Sathya Sai Media Centre</title>
  </Head>
  {
    app === null ? 
    <>
    {loader}
    </> :
    <>

     <audio ref={ref => playerRef = ref}>
     <source src={ music.currentSong.audio } type="audio/ogg"/>
                    Your browser does not support the audio element.
     </audio>
     <Component {...{attr: pageProps, app: app, loader: loader, router: router, redirect: redirect, setMusic: setMusic, getMusic: music, togglePlaylist: togglePlaylist}} /> 
     <CardMusic {...{setMusic: _setMusic, getMusic: music, togglePlaylist: togglePlaylist, closePlayer: closePlayer}} />
    </>
  }
  </>
}
*/
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
