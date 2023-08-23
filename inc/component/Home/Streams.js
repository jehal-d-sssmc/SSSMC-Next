import React, { useRef, useState } from 'react';
// Import Swiper React components
import channels from '../../../channel.json'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import react from 'react';




export default class Streams extends react.Component {

    constructor(props){
        super(props);
        this.state = {
            music: this.props.music
        }
        console.log([channels[0]]);
    }

    setMusic = (n) => {
        this.music = this.state.music;
        this.music.musicList = [channels[n]];
       // this.music.player = true;
        this.music.index = 0;
        this.setState({
            music: this.music
        }, ()=> {
            this.props.togglePlayer(true);
           // this.props.setMusic(this.music, n);
        })
        
    }
    //{name: "Prasanthi Stream", author: "Prasanthi", img: "http://www.sssmediacentre.org/assets/images/radiostations/prasanthi.jpg", audio: "https://stream.sssmediacentre.org:8443/asia", duration: "-0.
   
    
    render(){
        return (
                <div className='vscroller'>
                    <div className='radio-grid'>
                    {(
                    channels.map((item, i) => {
                        return (
                        <>
                        {
                            item.img !== undefined && 
                            <>
                            <div key={i} class="radio-grid-col effect8">
                                <div class="radio-circle">
                                <a>
                                <div class="radio-circle-img">
                                <img onClick={()=>{
                                    this.setMusic(i)
                                }} src={`${item.img}`} alt={item.title} />
                                    </div>
                                    </a>
                                </div>
                            </div>
                            
                            </>
                        }
                        </>
                        );
                    })
                    )}
                    </div>
                </div>
            );
    }
}
