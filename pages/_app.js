import App from 'next/app'
import { useEffect, useState } from 'react'

import '../styles/globals.css';
import '../styles/globals.scss';
import  '../styles/music.scss';
import { useRouter } from "next/router";



import client from '../inc/client'
import CardMusic from '../inc/component/common/CardMusic';

function MyApp({ Component, pageProps, request }) {
  const loader = <div className='preloader'>
    <img src='/loading.gif' alt='loader' />
    <div className="line"></div>
  </div>
  const [app, setApp] = useState(null);
  const [music, setMusic] = useState(null);
  const router = useRouter()
  const redirect = (path) => {
      router.push(path, undefined, { shallow:true })
  }

  const togglePlaylist = (e) => {
    console.log(music);
    music.showlist = !music.showlist;

    setMusic(music);
  }
  
  const _setMusic = (_music = music, index = 0) => {
    let mstate = music;
    
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
   // console.log(mstate)
    setMusic(mstate);
    
  }
 // console.log("8.)",_client);
  useEffect(()=>{
    let _app = (new client());
    _app.init(request, window).then((res)=>{
      
      _app.helper = res;
      setApp(_app);
      setMusic({
        index: 0,
        currentTime: '0:00',
        musicList: [{name:'Asia Stream', author: 'Prasanthi Mandir', img: 'http://www.sssmediacentre.org/assets/images/radiostations/prasanthi.jpg', audio:'https://stream.sssmediacentre.org:8443/asia', duration: '0:00'}],
        pause: false,
        showlist: false
      })
    })
    
  },[app])
  
  
  return <>
  {
    app === null ? 
    <>
    {loader}
    </> :
    <>
     <Component {...{attr: pageProps, app: app, loader: loader, router: router, redirect: redirect, setMusic: setMusic, getMusic: music, togglePlaylist: togglePlaylist}} /> 
     <CardMusic {...{setMusic: _setMusic, getMusic: music, togglePlaylist: togglePlaylist}} />
    </>
  }
  </>
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
