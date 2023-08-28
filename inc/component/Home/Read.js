import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function Read(props) {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={18}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="read align-self-center"
      >
        {props.read.map((item, i) => {
          return (
            <>
              {item.thumbPath !== undefined && (
                <>
                  <SwiperSlide key={i} className="">
                    <div className="featuredItem">
                      <div className="featuredImg">
                        <a
                          onClick={() => {
                            props.redirect(`/read/${item._id}`);
                          }}
                          href={"#"}
                          flink="f_reads"
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
                      <div className="featuredContent">
                        <h5
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            props.redirect(`/read/${item._id}`);
                          }}
                        >
                          {item.title}
                        </h5>
                        <div className="">
                          <span className="badge bg-secondary">
                            {item.categoryName}
                          </span>
                        </div>
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
