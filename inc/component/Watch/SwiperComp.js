import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function SwiperComp(props) {
  const __ = (url) => {
    try {
      let _url = new URL(url);
      return url;
    } catch (_) {
      return `https://content.sssmediacentre.org/${url}`;
    }
  };
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={18}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className={
          props.classname === undefined
            ? "vslider gold"
            : `vslider gold ${props.classname}`
        }
      >
        {props.featuredItems.map((item, i) => {
          return (
            <>
              {item.featuredUrl !== undefined && (
                <>
                  <SwiperSlide key={i} className="glowing">
                    <div className="featuredItem ratio ratio-16x9">
                      <div className="featuredImg">
                        <a
                          href={item.file_url}
                          class="fancybox"
                          data-fancybox="true"
                          flink="f_videos"
                          data-caption={item.title}
                        >
                          <img
                            class="d-block w-100"
                            src={__(`${item.featuredUrl}`)}
                            alt={item.title}
                            style={{ width: "100%" }}
                          />
                        </a>
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
