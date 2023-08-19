import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function SwiperComp(props) {
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
        className={
          props.classname === undefined
            ? "vslider"
            : `vslider ${props.classname}`
        }
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
                          href={`#`}
                          onClick={() => {
                            props.redirect(`/read/${item._id}`);
                          }}
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
                      <div className="featuredItemTitle text-start pt-1 pb-1">
                        <p>{item.title}</p>
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
