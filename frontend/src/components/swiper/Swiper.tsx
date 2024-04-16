"use client"
// error
// Error: (0 , react__WEBPACK_IMPORTED_MODULE_0__.createContext) is not a function
// use client 생성 후 해결

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


interface SwiperDefaultProps {
  options?: Partial<{
    spaceBetween: number;
    slidesPerView: number;
    pagination: boolean;
  }>;
  children: React.ReactNode;
}

export default function SwiperDefault({ options, children }: SwiperDefaultProps) {
  // 옵션 제어 객체로 변경
  const swiperOptions = {
    spaceBetween: options?.spaceBetween || 50,
    slidesPerView: options?.slidesPerView || 3,
    modules: options?.pagination ? [Pagination] : [],
    pagination: options?.pagination ? { clickable: true } : undefined
  };
  
  // 일괄 적용
  return (
    <Swiper {...swiperOptions} >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}