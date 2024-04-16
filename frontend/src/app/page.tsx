// next modules
import Image from "next/image";

// public assets
import MainVisual from '../../public/images/point_image01.webp'

// tanstack-query
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// service
import { getAnimePopular } from "@/service/getAnimePopular";

// ui-component
import AnimePopular from "./_component/AnimePopular";
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
    queryFn: getAnimePopular
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <main id="main">
      <HydrationBoundary state={dehydratedState}>
        <section>
          <div className="w-full">
            {/* <Image
        src={MainVisual}
        alt="메인 비쥬얼"
        layout="responsive"
        height={600}
        placeholder="blur"
        /> */}
          </div>
        </section>
        <section>
          {/* <AnimePopular isSlide />
          <AnimePopular /> */}
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
