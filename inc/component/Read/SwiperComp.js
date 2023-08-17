import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function SwiperComp(props) {
  console.log(props);
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={9}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className={props.classname === undefined ? "vslider" : `vslider ${props.classname}`}
      >
        {props.featuredItems.map((item, i) => {
          return (
            <>
              {item.featuredUrl !== undefined && (
                <>
                  <SwiperSlide key={i}>
                    <div className="featuredItem">
                      <div className="featuredImg">
                        <a
                          href={item}
                          class="fancybox"
                          data-fancybox="true"
                          flink="f_videos"
                          data-caption={item.title}
                        >
                          <img
                            class="d-block w-100"
                            src={`https://content.sssmediacentre.org/${item.thumbPath}`}
                            alt={item.title}
                            style={{ width: "100%" }}
                          />
                        </a>
                      </div>
                      <div className="featuredItemTitle text-start pt -2">
                        <h5>{item.title}</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              )}
            </>
          );
        })}
      </Swiper>
    </>
  );
}
