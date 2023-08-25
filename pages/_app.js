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

  search = (find = {text: '', type: ''}) => {
    this.setState({
      search: find
    })
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
        <Component {...{attr: this.props.pageProps, app: this.state.app, loader: this.loader, router: this.props.router, redirect: this.redirect, state: this.state, search: this.search}} /> 
        <CardMusic {...{app: this.state.app}} />
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
