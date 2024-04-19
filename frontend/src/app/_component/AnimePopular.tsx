"use client"

import React, { useEffect, useState, Suspense } from 'react'
import Image from 'next/image';

// component
// const SwiperDefault = React.lazy(() => import('@/components/swiper/Swiper'));
import SwiperDefault from '@/components/swiper/Swiper';
import LoadingSlide from '@/components/loading/LoadingSlide';

// service
import { getAnimeData } from '@/service/getAnimeData'

// tanstack-query
import { useQuery } from '@tanstack/react-query'

// types
import { Anime, AnimeInfo } from '@/types/animeTypes';

// utils
import { sortData } from '@/utils/utils';


type AnimePopularProps = {
  isSlide?: boolean
}

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23cccccc'%3E%3Crect width='100' height='100'/%3E%3C/svg%3E";

export default function AnimePopular({ isSlide }: AnimePopularProps) {
  const [sortedAnimeList, setSortedAnimeList] = useState<Anime[]>([]);
  const { data: apiResponse, isPending, error } = useQuery({
    queryKey: ['anime', 'popular'],
    queryFn: getAnimeData
  });

  const popularAnimeList = apiResponse?.data ?? [];

  useEffect(() => {
    if (apiResponse?.data) {
      const sortedData = sortData(apiResponse.data, 'favoritesCount'); // 정렬 함수 사용
      setSortedAnimeList(sortedData);
    }
  }, [apiResponse]);


  console.log(popularAnimeList)

  if (isPending) return <LoadingSlide/>
  if (error) return <div>An error occurred: {error.message}</div>;

  const swiperContent = (
    <SwiperDefault options={{ spaceBetween: 30, slidesPerView: 3, pagination: true }}>
      {sortedAnimeList.map((anime: Anime, index: number) => (
        <div key={index}>
          {anime.attributes.posterImage?.small && (
            <Image
            
              src={anime.attributes.posterImage.small}
              alt={`${anime.attributes.canonicalTitle} Cover`}
              width={100}
              height={150}
              layout="responsive"
              blurDataURL={placeholder}
              placeholder="blur"
            />
          )}
          <h3>{anime.attributes.canonicalTitle}</h3>
          <h4>{anime.attributes.abbreviatedTitles.join(", ")}</h4>
          <p>{`${anime.attributes.ageRating} - ${anime.attributes.ageRatingGuide}`}</p>
          <p>{`Average Rating: ${anime.attributes.averageRating}`}</p>
          <p>{anime.attributes.favoritesCount}</p>
        </div>
      ))}
    </SwiperDefault>
  );


  if (isSlide) {
    return (
      <div>
        {swiperContent}
      </div>
      // <Suspense fallback={<LoadingSlide/>}>
      //   {swiperContent}
      // </Suspense>
    );
  } else {
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
// async function getAnimeData({ pageParam = 1 }) {
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
//   } = useInfiniteQuery(['anime', 'infinite'], getAnimeData, {
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


