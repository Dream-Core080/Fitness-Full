"use client";

import { useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { NumericFormat } from "react-number-format";

import { ExerciseListItem } from "@/components/ExerciseListItem";
import Pagination from "@/components/ui/Pagination";
import { useFilterStore } from "@/stores/filter";
import {
  fetchExercises,
  fetchRecentHistories,
  fetchRecommended,
} from "../app.api";
import { ExercisesSkeleton } from "@/components/skeleton";

enum LibraryType {
  History,
  NewlyAdded,
  Recommended,
}

export default function Page() {
  const {
    searchKeyword,
    searchSortOption,
    searchCategoryOption,
    searchGoalOption,
    searchEquipmentOption,
    searchDifficultyOption,
    searchCollectionOption,
    setSearchSortOption,
  } = useFilterStore();

  const searchParams = useSearchParams();
  const library_type = useMemo(
    () => searchParams.get("library_type"),
    [searchParams]
  );

  // const collection = useMemo(
  //   () => searchParams.get("collection"),
  //   [searchParams]
  // );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    if (library_type) {
      const type = parseInt(library_type);
      if (type == LibraryType.NewlyAdded) setSearchSortOption("NewestAdded");
    } else {
      setSearchSortOption("Popularity")
    }
  }, [library_type, searchParams, setSearchSortOption]);

  const { data: exercises, refetch } = useQuery(
    "get-exercises",
    () => {
      let queryFn;
      const library_type = searchParams.get("library_type");
      if (library_type) {
        const type = parseInt(library_type);
        switch (type) {
          case LibraryType.History:
            queryFn = fetchRecentHistories;
            break;
          case LibraryType.Recommended:
            queryFn = fetchRecommended;
            break;
          default:
            queryFn = fetchExercises;
        }
      } else {
        queryFn = fetchExercises;
      }
      return queryFn({
        page: currentPage,
        perPage: 30,
        search: searchKeyword,
        sortBy: searchSortOption,
        category: searchCategoryOption,
        equipment: JSON.stringify(searchEquipmentOption),
        goal: searchGoalOption,
        collection: searchCollectionOption,
      });
    },
    {
      onSuccess: (data) => {
        setTotalCnt(data.count);
        setLastPage(Math.ceil(data.count / 30));
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [
    searchKeyword,
    searchSortOption,
    searchCategoryOption,
    searchGoalOption,
    searchEquipmentOption,
    searchDifficultyOption,
    searchCollectionOption,
    currentPage,
    refetch,
    searchParams
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
            {exercises.exercises?.map((exercise) => (
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
