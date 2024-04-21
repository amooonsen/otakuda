"use client"

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// 함수 컴포넌트 반환 타입을 React.ReactElement로 명시
const SmoothScrollProvider: React.FC = (): React.ReactElement => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth > 1024) {
      const lenis = new Lenis();

      // 애니메이션 프레임을 요청하는 함수
      function raf(time: number):void {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return ():void => {
        lenis.destroy();
        cancelAnimationFrame(requestAnimationFrame(raf));
      };
    }
  }, []);

  return <></>
}

export default SmoothScrollProvider;
