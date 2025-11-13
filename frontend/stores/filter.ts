import { SortOptions } from "@/utils/constants/fiter-options";
import { create } from "zustand";

type FilterStore = {
  searchKeyword: string | undefined;
  searchSortOption: string | undefined;
  searchCategoryOption: string | undefined;
  searchGoalOption: string | undefined;
  searchDifficultyOption: string | undefined;
  searchEquipmentOption: string[] | undefined;
  searchCollectionOption: string | undefined;
  setSearchKeyword: (param: string | undefined) => void;
  setSearchSortOption: (param: string | undefined) => void;
  setSearchCategoryOption: (param: string | undefined) => void;
  setSearchGoalOption: (param: string | undefined) => void;
  setSearchDifficultyOption: (param: string | undefined) => void;
  setSearchEquipmentOption: (param: string[] | undefined) => void;
  setSearchCollectionOption: (param: string | undefined) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  searchKeyword: "",
  searchSortOption: SortOptions[0].value,
  searchCategoryOption: "",
  searchGoalOption: "",
  searchDifficultyOption: "",
  searchEquipmentOption: [],
  searchCollectionOption: '',
  setSearchKeyword: (searchKeyword: string | undefined) => set({ searchKeyword }),
  setSearchSortOption: (searchSortOption: string | undefined) => set({ searchSortOption }),
  setSearchCategoryOption: (searchCategoryOption: string | undefined) => set({ searchCategoryOption }),
  setSearchGoalOption: (searchGoalOption: string | undefined) => set({ searchGoalOption }),
  setSearchDifficultyOption: (searchDifficultyOption: string | undefined) => set({ searchDifficultyOption }),
  setSearchEquipmentOption: (searchEquipmentOption: string[] | undefined) => set({ searchEquipmentOption }),
  setSearchCollectionOption: (searchCollectionOption: string | undefined) => set({ searchCollectionOption }),
  resetFilters: () => set({
    searchKeyword: "",
    searchSortOption: SortOptions[0].value,
    searchCategoryOption: undefined,
    searchGoalOption: "",
    searchDifficultyOption: "",
    searchEquipmentOption: [],
    searchCollectionOption: undefined,
  }),
}));
