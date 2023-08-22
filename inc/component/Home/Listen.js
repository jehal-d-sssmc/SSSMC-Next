import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import {  Pagination } from 'swiper/modules';

export default class Listen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      music: this.props.music
    }
  }

  loadrelated = async(album) => {
    let listen = await this.props.app.db(
      "GET",
      "find",
      "audio",
      {"album_name": album},
      {
        order: {
          createdAt: -1,
        },
        limit: 100
      }
    );
    // console.log(listen);
    return listen;
  }

  setMusic = async(attr = {}) => {
      this.music = this.state.music;
      this.music.musicList = [attr];
      let related = await this.loadrelated(attr.group);
      console.log(related)
    // this.music.player = true;
      this.music.index = 0;
      this.setState({
          music: this.music
      }, ()=> {
          this.props.togglePlayer(true);
        // this.props.setMusic(this.music, n);
      })
      
  }

  render(){

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={9}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="listen align-self-center"
      >
        {this.props.listen.type !== "success" ? (
          <div className="alert alert-error">{this.props.listen.msg}</div>
        ) : (
          this.props.listen.data.map((item, i) => {
            return (
              <>
              {
                item.file_identifier_thumb !== undefined && 
                <>
                <SwiperSlide key={i} className='effect2'>
                  <div className="listenItem">
                    <div className="listenImg" onClick={()=>{
                        this.setMusic({
                          name: `${item.title} | ${item.audioType}`,
                          author: item.album_name,
                          img: `https://content.sssmediacentre.org/${item.file_identifier_thumb}`,
                          audio: `https://content.sssmediacentre.org/${item.file_identifier}`,
                          duration: item.duration,
                          group: item.grouping
                        });
                        return false;
                      }} style={{cursor:"pointer"}}>
                      
                      <img
                        class="d-block w-100"
                        src={`https://content.sssmediacentre.org/${item.file_identifier_thumb}`}
                        alt={item.title}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                </>
              }
              </>
            );
          })
        )}
      </Swiper>
    </>
  );
  }

}
