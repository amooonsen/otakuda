"use client"

import React from 'react'
// component
import SwiperDefault from '@/components/swiper/Swiper';

// service
import { getAnimePopular } from '@/service/getAnimePopular'

// tanstack-query
import { useQuery } from '@tanstack/react-query'

// types

import { Anime, AnimeInfo } from '@/types/animeTypes';

type AnimePopularProps = {
  isSlide?: boolean
}

export default function AnimePopular({ isSlide }: AnimePopularProps) {
  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['anime', 'popular'],
    queryFn: getAnimePopular
  });

  const popularAnimeList = apiResponse?.data ?? [];

  console.log(popularAnimeList)

  if (isLoading) return <div>Loading...</div>; // 로딩 인디케이터
  if (error) return <div>An error occurred: {error.message}</div>; // 에러 메시지

  const renderSwiper = () => (
    <SwiperDefault options={{ spaceBetween: 30, slidesPerView: 3 }}>
      {popularAnimeList.map((anime:Anime, index:number) => (
        <div key={index}>
          <h2>{anime.attributes.canonicalTitle}</h2>
          <h3>{anime.attributes.abbreviatedTitles.join(", ")}</h3>
          <p>{`${anime.attributes.ageRating} - ${anime.attributes.ageRatingGuide}`}</p>
          <p>{`Average Rating: ${anime.attributes.averageRating}`}</p>
        </div>
      ))}
    </SwiperDefault>
  );
  

  // 리스트 렌더링을 위한 더 상세한 정보 표시
  const renderList = () => (
    <ul>
      {popularAnimeList.map((anime: Anime, index: number) => (
        <li key={`popular-anime-${index}`}>
          <h3>{anime.attributes.canonicalTitle}</h3>
          <p>Abbreviated Titles: {anime.attributes.abbreviatedTitles.join(", ")}</p>
          <p>Rating: {anime.attributes.ageRating} - {anime.attributes.ageRatingGuide}</p>
          <p>Average Rating: {anime.attributes.averageRating}</p>
        </li>
      ))}
    </ul>
  );
  return isSlide ? renderSwiper() : renderList();

}
