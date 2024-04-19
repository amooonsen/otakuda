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
    <main id="main">
      <HydrationBoundary state={dehydratedState}>
        <section>
          {/* h-96: 기본 높이로 24rem (대략 384px)을 설정합니다.
            sm:h-[500px]: 640px 이상의 화면에서는 높이를 500px로 설정합니다.
            md:h-[700px]: 768px 이상의 화면에서는 높이를 700px로 설정합니다.
            lg:h-[900px]: 1024px 이상의 화면에서는 높이를 900px로 설정합니다.
            xl:h-[1100px]: 1280px 이상의 화면에서는 높이를 1100px로 설정합니다.
            2xl:h-[1500px]: 1536px 이상의 화면에서는 높이를 1500px로 설정합니다. */}
          <div className="relative w-full h-96 sm:h-[500px] md:h-[700px] lg:h-[900px] xl:h-[1100px] 2xl:h-[1500px]">
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
        <section>
          <h2 className="text-[64px]">Top Airing Anime</h2>
          <AnimePopular isSlide />
          {/* <AnimePopular /> */}
        </section> 
        <section>
          <h2 className="text-[64px]">Trending This Week</h2>
          {/* <AnimeChapters /> */}
          {/* <AnimePopular /> */}
        </section> 
        <Collapsible>
          <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
          <CollapsibleContent>
            Yes. Free to use for personal and commercial projects. No attribution
            required.
          </CollapsibleContent>
        </Collapsible>
      </HydrationBoundary>
    </main>
  );
}
