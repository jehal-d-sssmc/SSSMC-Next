import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Masonry from 'react-masonry-css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const breakpointColumnsObj = {
  default: 5,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1
};

export default function Read(props) {
  return (
    <>
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      
    
        {
          props.read.type !== "success" ? (
            <div className="alert alert-error">{props.read.msg}</div>
          ) :
          props.read.data.map((item, i) => {
            return (
            
              <div className="card text-center my-masonry-grid_column p-2" style={{borderRadius:"15px"}} >
                  
                  <div className="preview-img">
                    {
                     <img
                      class="d-block w-100"
                      src={`https://content.sssmediacentre.org/${item.thumbPath}`}
                      alt={item.title}
                      style={{ width: "100%" }}
                    />
                    }
                  </div>
                    <div className='featuredContent'>
                      <h5>{item.title}</h5>
                    </div>
                  
                  
              </div>
            );
          })
        }
      </Masonry>
      
    </>
  );
}
