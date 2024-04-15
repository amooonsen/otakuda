// next modules
import Image from "next/image";

// public assets
import MainVisual from '../../public/images/point_image01.webp'

// tanstack-query
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

// service
import { getAnimePopular } from "@/service/getAnimePopular";

// ui-component
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SwiperDefault from "@/components/swiper/Swiper";
import { ReactElement } from "react";
import AnimePopular from "./_component/AnimePopular";

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
          {/* <SwiperDefault /> */}
          <AnimePopular isSlide/>
        </section>
        {/* <section 
      className="grid grid-cols-8">
      </section> */}
      </HydrationBoundary>
    </main>
  );
}
