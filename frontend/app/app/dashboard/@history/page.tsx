"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { Pathnames } from "@/utils/constants/pathnames";
import { ExerciseListItem } from "@/components/ExerciseListItem";
import {
  fetchNewlyAdded,
  fetchRecentHistories,
  fetchRecommended,
} from "../../app.api";
import { ExercisesGroupSkeleton } from "@/components/skeleton";
import localFont from 'next/font/local'
const myFont = localFont({ src: '../../../../public/fonts/BebasNeue-Regular.ttf' });

const tabList = [
  ["EXERCISE HISTORY"],
  ["NEWLY ADDED"],
  ["RECOMMENDED FOR YOU"],
];

export default function Page() {
  const router = useRouter();
  const { data: exerciseHistories } = useQuery("exercise-history", () =>
    fetchRecentHistories({ page: 1, perPage: 5 })
  );
  const { data: exericseNewlyAdded } = useQuery("exercise-newlyadded", () =>
    fetchNewlyAdded({ page: 1, perPage: 5, sortBy: "NewestAdded" })
  );
  const { data: exerciseRecommended } = useQuery("exercise-recommended", () =>
    fetchRecommended({ page: 1, perPage: 5 })
  );
  return (
    <main>
      <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[1.75rem] xl:gap-[4.5rem] 2xl:gap-[7.5rem]">
        {[exerciseHistories, exericseNewlyAdded, exerciseRecommended].map(
          (exericses, index) => (
            <div
              key={`exercises${index}`}
              className="mt-5 w-full max-w rounded-lg shadow dark:bg-[#0d0d0d] dark:border-gray-00"
            >
              <div className="flex items-center justify-between mb-4">
                <h6 className="text-[1.6em] __className_679731 test-sm-condensed font-bold whitespace-nowrap leading-none text-white dark:text-white">
                  {tabList[index]}
                </h6>
                <button
                  onClick={() => {
                    router.push(`${Pathnames.LIBRARY}/?library_type=${index}`);
                  }}
                  className="text-xs font-small text-white hover:underline dark:text-blue-500 pt-1 whitespace-nowrap"
                >
                  See all
                </button>
              </div>
              {exericses ? (
                exericses.exercises.map((exercise) => (
                  <ExerciseListItem
                    key={exercise._id}
                    className="my-3"
                    exercise={exercise}
                  />
                ))
              ) : (
                <ExercisesGroupSkeleton />
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
}
