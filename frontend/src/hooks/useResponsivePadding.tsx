"use client"

import { useEffect, useState } from 'react';

type PaddingLeft = 'pl-10' | 'pl-5';

// 커스텀 훅 정의
export const useResponsivePadding = (): PaddingLeft => {
  const [padding, setPadding] = useState<PaddingLeft>('pl-10');

  useEffect(() => {
    const handleResize = () => {
      setPadding(window.innerWidth <= 1024 ? 'pl-5' : 'pl-10');
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 초기 설정
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return padding;
};
