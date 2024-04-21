// next modules
import Image from "next/image";

// public assets
import MainVisual from '../../public/images/point_image01.webp'

// tanstack-query
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// service
import { getAnimeData } from "@/service/getAnimeData";

// ui-component
import AnimePopular from "./_component/AnimePopular";
import AnimeChapters from "./_component/AnimeChapters";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// types
import { ReactElement } from "react";

export default async function Home(): Promise<ReactElement> {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['anime', 'popular'],
    queryFn: getAnimeData
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <main id="main" className="mb-20">
      <HydrationBoundary state={dehydratedState}>
        <section>
          <div className="relative w-full h-screen md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
            <Image
              src={MainVisual}
              alt="메인 비쥬얼"
              fill
              priority
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-[64px] pl-10">Top Airing Anime.</h2>
          <AnimePopular isSlide />
          {/* <AnimePopular /> */}
        </section> 
        <section className="mt-10">
          <h2 className="text-[64px] pl-10">Trending This Week.</h2>
          <AnimePopular isSlide />
        </section> 
        <section className="mt-10">
          <h2 className="text-[64px] pl-10">Highest Rated Anime.</h2>
          <AnimePopular isSlide />
        </section> 
        <section className="mt-10">
          <h2 className="text-[64px] pl-10">Most Popular Anime.</h2>
          <AnimePopular isSlide/>
        </section> 
      </HydrationBoundary>
    </main>
  );
}
