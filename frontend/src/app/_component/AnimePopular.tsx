"use client"

import SwiperDefault from '@/components/swiper/Swiper';
import { getAnimePopular } from '@/service/getAnimePopular'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

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

  const renderSwiperItems = () => {
    return popularAnimeList.map(anime => ({
      title: anime.attributes.canonicalTitle,
      subtitle: anime.attributes.abbreviatedTitles.join(", "),
      rating: `${anime.attributes.ageRating} - ${anime.attributes.ageRatingGuide}`,
      averageRating: `Average Rating: ${anime.attributes.averageRating}`
    }));
  };

  const renderSwiper = () => (
    <SwiperDefault
      items={renderSwiperItems()}
    />
  );

  // 리스트 렌더링을 위한 더 상세한 정보 표시
  const renderList = () => (
    <ul>
      {popularAnimeList.map((anime, index) => (
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
