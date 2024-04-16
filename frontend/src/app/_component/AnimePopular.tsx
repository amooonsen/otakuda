"use client"

import React from 'react'
import { Suspense } from 'react';

// component
const SwiperDefault = React.lazy(() => import('@/components/swiper/Swiper'));

// import SwiperDefault from '@/components/swiper/Swiper';
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
  const { data: apiResponse, isPending, error } = useQuery({
    queryKey: ['anime', 'popular'],
    queryFn: getAnimePopular
  });

  const popularAnimeList = apiResponse?.data ?? [];

  if (isPending) return <div>데이터 로딩중...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const swiperContent = (
    <SwiperDefault options={{ spaceBetween: 30, slidesPerView: 3, pagination: true }}>
      {popularAnimeList.map((anime: Anime, index: number) => (
        <div key={index}>
          <h2>{anime.attributes.canonicalTitle}</h2>
          <h3>{anime.attributes.abbreviatedTitles.join(", ")}</h3>
          <p>{`${anime.attributes.ageRating} - ${anime.attributes.ageRatingGuide}`}</p>
          <p>{`Average Rating: ${anime.attributes.averageRating}`}</p>
        </div>
      ))}
    </SwiperDefault>
  );


  if (isSlide) {
    return (
      <Suspense fallback={<div>스와이퍼 로딩 중</div>}>
        {swiperContent}
      </Suspense>
    );
  }else {
    return (
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
  }
}



// 만약 list에서 무한스크롤을 구현하려면 ? 

// 서비스 수정: 페이지별로 데이터를 가져오는 함수
// async function getAnimePopular({ pageParam = 1 }) {
//   const response = await fetch(`https://kitsu.io/api/edge/anime?page=${pageParam}`);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// }

// import { useInfiniteQuery } from '@tanstack/react-query';

// const renderList = () => {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//     error
//   } = useInfiniteQuery(['anime', 'infinite'], getAnimePopular, {
//     getNextPageParam: (lastPage, pages) => lastPage.nextPage
//   });

//   if (status === 'loading') return <div>Loading...</div>;
//   if (status === 'error') return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <ul>
//         {data.pages.map((group, i) => (
//           <React.Fragment key={i}>
//             {group.data.map((anime) => (
//               <li key={anime.id}>
//                 {anime.attributes.canonicalTitle}
//               </li>
//             ))}
//           </React.Fragment>
//         ))}
//       </ul>
//       <button
//         onClick={() => fetchNextPage()}
//         disabled={!hasNextPage || isFetchingNextPage}
//       >
//         {isFetchingNextPage
//           ? 'Loading more...'
//           : hasNextPage
//           ? 'Load More'
//           : 'Nothing more to load'}
//       </button>
//     </div>
//   );
// };
