"use client"
// error
// Error: (0 , react__WEBPACK_IMPORTED_MODULE_0__.createContext) is not a function
// use client 생성 후 해결

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

interface SwiperDefaultProps {
  items: string[],
  options?: {
    spaceBetween?: number,
    slidesPerView?: number;
  }
}

export default function SwiperDefault({ items, options }: SwiperDefaultProps) {
  return (
    <Swiper
      spaceBetween={options?.spaceBetween}
      slidesPerView={options?.slidesPerView}
    >
      <SwiperSlide>{items}</SwiperSlide>
    </Swiper>
  );
};