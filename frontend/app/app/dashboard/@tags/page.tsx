"use client";

import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Carousel from "react-multi-carousel";
import { Pathnames } from "@/utils/constants/pathnames";
import {
  SliderButtonGroup,
  carousel_responsive,
} from "@/components/ui/Carousel";
import { CarouselSkeleton, TagsSkeleton } from "@/components/skeleton";
import { fetchTags, fetchCollections } from "../../app.api";
import localFont from 'next/font/local'
const myFont = localFont({ src: '../../../../public/fonts/BebasNeue-Regular.ttf' });

export default function Page() {
  const router = useRouter();
  const [activeTab, SetActiveTab] = useState(0);
  const { data: tags } = useQuery("get-tags", fetchTags);
  const {
    data: collections,
    refetch: refetchCollections,
    isRefetching: isRefetchingCollections,
  } = useQuery(
    "get-collections",
    () => tags && fetchCollections(tags[activeTab].id)
  );
  useEffect(() => {
    refetchCollections();
  }, [tags, activeTab, refetchCollections]);
  return (
    <main>
      <div className="relative">
        {!tags && <TagsSkeleton />}
        {tags?.map(({ id, name }, index) => (
          <button
            key={id}
            className={`text-white hover:bg-red-600 focus:outline-none font-medium rounded-lg text-[0.8em] px-5 py-2.5 me-[0.8rem] mb-2 dark:bg-[#0d0d0d] dark:hover:bg-gray-700 ${
              activeTab === index ? "bg-red-600" : "bg-[#0d0d0d]"
            }`}
            onClick={() => {
              SetActiveTab(index);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="relative mt-2 mb-12">
        {isRefetchingCollections || !collections ? (
          <CarouselSkeleton />
        ) : (
          <Carousel
            containerClass="carousel-container"
            arrows={false}
            infinite={true}
            draggable={false}
            autoPlay={true}
            autoPlaySpeed={3000}
            responsive={carousel_responsive}
            renderButtonGroupOutside={collections.length > 2 ? true: false}
            customButtonGroup={<SliderButtonGroup />}
          >
            {collections.map(({ id, thumbnail, title, count }) => {
              return (
                <div
                  key={id}
                  className="relative mr-4 hover:cursor-pointer h-60 rounded-lg"
                  onClick={() => {
                    router.push(`${Pathnames.LIBRARY}/?collection=${id}`);
                  }}
                >
                  <Image
                    src={thumbnail}
                    className="rounded-3xl"
                    alt="Exercise Thumbnail"
                    objectFit="cover"
                    fill={true}
                    priority
                  />
                  <div className="absolute bottom-0 w-full p-2 left-5 bottom-5">
                    <p className="text-base font-medium text-white mb-1">
                      {title}
                    </p>
                    <p className="text-sm text-white/75">{count} Exercises</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </main>
  );
}
