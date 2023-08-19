import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export default function Shorts(props) {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={18}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="shorts"
      >
        {props.shorts.type !== "success" ? (
          <div className="alert alert-error">{props.shorts.msg}</div>
        ) : (
          props.shorts.data.map((item, i) => {
            return (
              <>
              {
                item.featuredUrl !== undefined && 
                <>
                <SwiperSlide key={i} className='effect6'>
                  <div className="shortsItem " style={{maxWidth:"320px"}}>
                    <div className="shortsImg ratio ratio-9x16 shadow-1" >
                      <a href={item.file_url} class="fancybox" data-fancybox="true" flink="f_videos" data-caption={item.title}>
                      <img
                        class="d-block w-100"
                        src={`${item.thumb_path}`}
                        alt={item.title}
                        style={{ width: "100%" }}
                      />
                      </a>
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

