"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FreeMode, Thumbs, Pagination } from "swiper/modules";

const Slider = ({ photos }: { photos: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="w-full md:w-1/2">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{
          dynamicBullets: false,
          clickable: true,
        }}
        modules={[FreeMode, Thumbs, Pagination]}
        className="mySwiper2 h-[65vh] md:h-[75vh] bg-secondary"
      >
        {photos?.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <Zoom>
                <img
                  src={photo}
                  className="h-[65vh] md:h-[75vh] object-cover mx-auto"
                  loading="lazy"
                />
              </Zoom>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={7}
        freeMode={true}
        watchSlidesProgress={true}
        pagination={{
          dynamicBullets: false,
          clickable: true,
        }}
        modules={[FreeMode, Thumbs, Pagination]}
        className="mySwiper mt-5"
      >
        {photos?.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={photo}
                className="h-full w-full object-cover cursor-pointer"
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
