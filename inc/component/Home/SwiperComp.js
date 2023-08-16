import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export default function SwiperComp() {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={27}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="vslider"
      >
        <SwiperSlide>
          <img
            class="d-block w-100"
            src="https://i3.ytimg.com/vi/KCbA6Il30P0/maxresdefault.jpg"
            alt="First slide"
            style={{ width: '100%' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            class="d-block w-100"
            src="https://i3.ytimg.com/vi/C3U3ttbUlEg/maxresdefault.jpg"
            alt="First slide"
            style={{ width: '100%' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            class="d-block w-100"
            src="https://i3.ytimg.com/vi/UlDWRZa0Liw/maxresdefault.jpg"
            alt="First slide"
            style={{ width: '100%' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            class="d-block w-100"
            src="https://i3.ytimg.com/vi/dndw9D5hvPg/maxresdefault.jpg"
            alt="First slide"
            style={{ width: '100%' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            class="d-block w-100"
            src="https://i3.ytimg.com/vi/j45U0Igtqw4/maxresdefault.jpg"
            alt="First slide"
            style={{ width: '100%' }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
