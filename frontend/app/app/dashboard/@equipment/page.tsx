"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import Carousel from "react-multi-carousel";

import {
  SliderButtonGroup,
  carousel_responsive,
} from "@/components/ui/Carousel";
import { CarouselSkeleton } from "@/components/skeleton";
import { fetchShopEquipments } from "../../app.api";
import localFont from 'next/font/local'
const myFont = localFont({ src: '../../../../public/fonts/BebasNeue-Regular.ttf' });

export default function Page() {
  const { data: shopEquipments, isLoading } = useQuery(
    "exercise-shopEquipments",
    () => fetchShopEquipments()
  );
  return (
    <main>
      <div>
        <h6 className="text-[1.6em] __className_679731 test-sm-condensed font-bold leading-none text-white dark:text-white mb-8">
          SHOP EQUIPMENT
        </h6>
        {isLoading && <CarouselSkeleton />}
        {shopEquipments && (
          <div className="relative">
            <Carousel
              className="mt-2 mb-20"
              arrows={false}
              infinite={true}
              draggable={false}
              autoPlay={true}
              autoPlaySpeed={3000}
              responsive={carousel_responsive}
              renderButtonGroupOutside={true}
              customButtonGroup={<SliderButtonGroup />}
            >
              {shopEquipments.map(({ id, thumbnail, title, price, link }) => (
                <Link key={id} href={link} target="new">
                  <div className="relative h-60 mr-4">
                    <Image
                      className="rounded-2xl"
                      src={thumbnail}
                      alt="Shop Equipment Thumbnail"
                      objectFit="cover"
                      fill={true}
                      priority
                    />
                  </div>
                  <div className="absolute bottom-0 w-full p-2 left-5 bottom-5">
                    <p className="text-base font-medium text-white whitespace-nowrap mb-3">
                      {title}
                    </p>
                    <p className="text-sm text-white/75">${price}</p>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </main>
  );
}
