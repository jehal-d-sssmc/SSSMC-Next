import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';




export default function Streams(props) {
    //{name: "Prasanthi Stream", author: "Prasanthi", img: "http://www.sssmediacentre.org/assets/images/radiostations/prasanthi.jpg", audio: "https://stream.sssmediacentre.org:8443/asia", duration: "-0.
    const channels = [
        {
            audio: "https://content.sssmediacentre.org/gallery/uploads/128kbps_sai_vandanamp3__SPLIT__1655803449695.mp3",
            img: "//www.sssmediacentre.org/assets/images/radiostations/morning_prayer.jpg",
            name: "Morning Prayer",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/vedam",
            img: "//www.sssmediacentre.org/assets/images/radiostations/vedam.jpg",
            name: "Vedam",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/saigayathri",
            img: "//www.sssmediacentre.org/assets/images/radiostations/sai_gayatri.jpg",
            name: "Sai Gayathri",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/gayathri",
            img: "//www.sssmediacentre.org/assets/images/radiostations/gayatri_mantra.jpg",
            name: "Gayathri Mantra",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/shivapanchakshari",
            img: "//www.sssmediacentre.org/assets/images/radiostations/shiv_panchakshari.jpg",
            name: "Shiv Panchakshari",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/asia",
            img: "//www.sssmediacentre.org/assets/images/radiostations/prasanthi.jpg",
            name: "Prasanthi Asia | Ameri | Afri",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/bhajan",
            img: "//www.sssmediacentre.org/assets/images/radiostations/bhajan.jpg",
            name: "Bhajan",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/discourse",
            img: "//www.sssmediacentre.org/assets/images/radiostations/discourse.jpg",
            name: "Discourse",
            duration: "-0.00",
            author: "Radio Stream"
        },
        {
            audio: "https://stream.sssmediacentre.org:8443/telugu",
            img: "//www.sssmediacentre.org/assets/images/radiostations/telugu.jpg",
            name: "Telugu",
            duration: "-0.00",
            author: "Radio Stream"
        }
    ];

 console.log(props)   
 const setMusic = (n) => {
        let music = props.getMusic;
        music.musicList = channels;
        music.index = n;
        props.setMusic(music, n);
        console.log(music)
 }
 setMusic(0);
    
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
                <div key={i} class="radio-grid-col"><div class="radio-circle">
                    <a>
                    <div class="radio-circle-img">
                    <img onClick={()=>{
                        setMusic(i)
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
