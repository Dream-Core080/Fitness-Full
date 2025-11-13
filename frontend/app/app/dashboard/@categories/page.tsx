"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { fetchCategories } from "../../app.api";
import { Pathnames } from "@/utils/constants/pathnames";
import { useFilterStore } from "@/stores/filter";
import { CategoriesSkeleton } from "@/components/skeleton";
import localFont from 'next/font/local'
import { useState } from "react";
const myFont = localFont({ src: '../../../../public/fonts/BebasNeue-Regular.ttf' });

export default function Page() {
  const { setSearchCategoryOption } = useFilterStore();
  const { data: categories } = useQuery("exercise-categories", () =>
    fetchCategories()
  );
  const [hoveredCategory, setHoveredCategory] = useState<any>(null);
  return (
    <main>
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h6 className="text-[1.6em] __className_679731 test-sm-condensed leading-none text-white dark:text-white ">
            BROWSE BY CATEGORY
          </h6>
          <Link
            href={Pathnames.LIBRARY}
            className="text-sm font-medium text-white  hover:underline dark:text-blue-500"
          >
            See all
          </Link>
        </div>

        {categories ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-[2rem]">
            {categories.map(({ id, thumbnail, title, count }) => (
              <div 
                key={id} 
                className="relative"
                onMouseEnter={() => setHoveredCategory(id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={Pathnames.LIBRARY}
                  onClick={() => {
                    setSearchCategoryOption(id);
                  }}
                >
                  <div className="relative h-40">
                    <Image
                      className="rounded-lg"
                      src={thumbnail}
                      alt="Exercise Thumbnail"
                      objectFit="cover"
                      fill={true}
                    />
                  </div>
                  <div className="absolute bottom-0 w-full p-2 overflow-hidden">
                    <div className="relative w-full overflow-hidden">
                    <p
                        className={`text-[0.8em] font-medium text-white whitespace-nowrap w-full transition-all duration-500 ${
                          hoveredCategory === id ? "animate-scroll" : ""
                        }`}
                      >
                        {title} Exercise
                      </p>
                    </div>
                    <p className="text-[0.7em] text-white/75">{count} Exercises</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <CategoriesSkeleton />
        )}
      </div>
    </main>
  );
}
