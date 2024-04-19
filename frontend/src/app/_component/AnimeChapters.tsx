"use client"

import React from 'react'
import { Suspense } from 'react';

// component
const SwiperDefault = React.lazy(() => import('@/components/swiper/Swiper'));
import LoadingSlide from '@/components/loading/LoadingSlide';

// service
import { getAnimeChapters } from '@/service/getAnimeChapters'

// tanstack-query
import { useQuery } from '@tanstack/react-query'

// types
import { Anime, AnimeInfo } from '@/types/animeTypes';


type AnimeChaptersProps = {
  isSlide?: boolean
}

export default function AnimeChapters({ isSlide }: AnimeChaptersProps) {
  const { data: apiResponse, isPending, error } = useQuery({
    queryKey: ['anime', 'chapters'],
    queryFn: getAnimeChapters
  });

  const popularAnimeList = apiResponse?.data ?? [];

  if (isPending) return <LoadingSlide/>
  if (error) return <div>An error occurred: {error.message}</div>;

  if (isSlide) {
    return (
      <Suspense fallback={<div>스와이퍼 로딩 중</div>}>
        {/* {swiperContent} */}
      </Suspense>
    );
  }else {
    return (
      <ul>
        <li>123</li>
      </ul>
      // <ul>
      //   {popularAnimeList.map((anime: Anime, index: number) => (
      //     <li key={`popular-anime-${index}`}>
      //       <h3>{anime.attributes.canonicalTitle}</h3>
      //       <p>Abbreviated Titles: {anime.attributes.abbreviatedTitles.join(", ")}</p>
      //       <p>Rating: {anime.attributes.ageRating} - {anime.attributes.ageRatingGuide}</p>
      //       <p>Average Rating: {anime.attributes.averageRating}</p>
      //     </li>
      //   ))}
      // </ul>
    );
  }
}
