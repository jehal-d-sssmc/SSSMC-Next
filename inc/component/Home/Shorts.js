import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export default function Shorts() {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="shorts"
      >
        <SwiperSlide>

        <div className="d-block w-100">
          <iframe
            width="1280px"
            height="360px"
            id="shorts_0"
            src="https://www.youtube.com/embed/iAr67lFh0_s"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              position: "relative",
              top: 0,
              left: 0,
              zIndex: 5,
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 15
            }}
            data-gtm-yt-inspected-4="true"
          />
        </div>
         
        </SwiperSlide>
        <SwiperSlide>
        <div className="d-block w-100">
          <iframe
            width="640px"
            height="360px"
            id="shorts_0"
            src="https://www.youtube.com/embed/iAr67lFh0_s"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              position: "relative",
              top: 0,
              left: 0,
              zIndex: 5,
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 15
            }}
            data-gtm-yt-inspected-4="true"
          />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="d-block w-100">
          <iframe
            width="1280px"
            height="360px"
            id="shorts_0"
            src="https://www.youtube.com/embed/iAr67lFh0_s"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              position: "relative",
              top: 0,
              left: 0,
              zIndex: 5,
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 15
            }}
            data-gtm-yt-inspected-4="true"
          />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="d-block w-100">
          <iframe
            width="1280px"
            height="360px"
            id="shorts_0"
            src="https://www.youtube.com/embed/iAr67lFh0_s"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              position: "relative",
              top: 0,
              left: 0,
              zIndex: 5,
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 15
            }}
            data-gtm-yt-inspected-4="true"
          />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="d-block w-100">
          <iframe
            width="1280px"
            height="360px"
            id="shorts_0"
            src="https://www.youtube.com/embed/iAr67lFh0_s"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              position: "relative",
              top: 0,
              left: 0,
              zIndex: 5,
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 15
            }}
            data-gtm-yt-inspected-4="true"
          />
        </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

