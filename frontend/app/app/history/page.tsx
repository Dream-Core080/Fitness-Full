"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NumericFormat } from "react-number-format";

import { ExerciseListItem } from "@/components/ExerciseListItem";
import Pagination from "@/components/ui/Pagination";

import { useFilterStore } from "@/stores/filter";

import { Exercise } from "../app.type";
import { fetchRecentHistories } from "../app.api";
import { ExercisesSkeleton } from "@/components/skeleton";

export default function Page() {
  const {
    searchKeyword,
    searchSortOption,
    searchCategoryOption,
    searchGoalOption,
    searchEquipmentOption,
    searchCollectionOption,
    resetFilters,
  } = useFilterStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [initialized, setInitialized] = useState(false);

  const { data: exercises, refetch } = useQuery(
    "get-exercises",
    () => {
      return fetchRecentHistories({
        page: currentPage,
        perPage: 30,
        search: searchKeyword,
        sortBy: searchSortOption,
        category: searchCategoryOption,
        goal: searchGoalOption,
        equipment: JSON.stringify(searchEquipmentOption),
        collection: searchCollectionOption,
      });
    },
    {
      enabled: initialized,
      onSuccess: (data: any) => {
        setTotalCnt(data.count);
        setLastPage(Math.ceil(data.count / 30));
      },
    }
  );

  useEffect(() => {
    resetFilters();
    setInitialized(true);
  }, [resetFilters]);

  useEffect(() => {
    if (initialized) {
      refetch();
    }
  }, [
    currentPage,
    searchKeyword,
    searchSortOption,
    searchCategoryOption,
    searchGoalOption,
    searchEquipmentOption,
    searchCollectionOption,
    refetch,
    initialized,
  ]);

  return (
    <main>
      <div className="p-32 pt-16">
        <h6 key="total-count" className="text-white/60 mb-10">
          Showing{" "}
          {exercises?.exercises.length ? exercises?.exercises.length : 0}{" "}
          results out of{" "}
          <NumericFormat
            className="bg-transparent"
            value={totalCnt}
            thousandSeparator=","
            displayType="text"
          />
        </h6>
        {exercises ? (
          <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[1.75rem] xl:gap-x-[3.5rem] 2xl:gap-x-[7.5rem]">
            {exercises?.exercises?.map((exercise: Exercise) => (
              <ExerciseListItem key={exercise._id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <ExercisesSkeleton />
        )}
        <div className="w-full flex justify-center">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            maxLength={7}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
