import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Listen(props) {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className="listen"
      >
        {props.listen.type !== "success" ? (
          <div className="alert alert-error">{props.listen.msg}</div>
        ) : (
          props.listen.data.map((item, i) => {
            return (
              <>
              {
                item.file_identifier_thumb !== undefined && 
                <>
                <SwiperSlide key={i}>
                  <div className="listenItem">
                    <div className="listenImg" >
                      <a href={`https://content.sssmediacentre.org/${item.file_identifier}`} class="fancybox" data-fancybox="true" flink="f_videos" data-caption={item.title}>
                      <img
                        class="d-block w-100"
                        src={`https://content.sssmediacentre.org/${item.file_identifier_thumb}`}
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
