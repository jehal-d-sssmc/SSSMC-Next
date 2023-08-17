import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function SwiperComp(props) {
  //console.log(props);
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className={props.classname === undefined ? "vslider" : `vslider ${props.classname}`}
      >
        {props.featuredItems.type !== "success" ? (
          <div className="alert alert-error">{props.featuredItems.msg}</div>
        ) : (
          props.featuredItems.data.map((item, i) => {
            return (
              <>
              {
                item.featuredUrl !== undefined && 
                <>
                <SwiperSlide key={i} className='effect2'>
                  <div className="featuredItem">
                    <div className="featuredImg">
                      <a href={item.file_url} class="fancybox" data-fancybox="true" flink="f_videos" data-caption={item.title}>
                      <img
                        class="d-block w-100"
                        src={`https://content.sssmediacentre.org/${item.featuredUrl}`}
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
