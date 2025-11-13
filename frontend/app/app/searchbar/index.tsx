import { useRouter } from "next-nprogress-bar";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import ReactSelect from "react-select";

import reactSelectStylesConfig from "@/libs/react-select";
import { Pathnames, PrivatePathnames } from "@/utils/constants/pathnames";
import { Button } from "@material-tailwind/react";
import { SearchField } from "@/components/ui/SearchField";
import { useFilterStore } from "@/stores/filter";
import {
  SortOptions,
  EquipmentOptions,
  GoalOptions,
} from "@/utils/constants/fiter-options";
import { fetchAllCollections, fetchCategories, fetchShopEquipments } from "../app.api";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    searchSortOption,
    searchCategoryOption,
    setSearchKeyword,
    searchEquipmentOption,
    searchCollectionOption,
    setSearchCategoryOption,
    setSearchEquipmentOption,
    setSearchCollectionOption,
    setSearchGoalOption,
    setSearchSortOption,
  } = useFilterStore();

  const [goalOption, setGoalOption] = useState(null);
  const [equipmentOptions, setEquipmentOptions] = useState<
    { label: string; value: string | undefined }[]
  >([{ label: "No filter", value: undefined }]);
  const [categoryOptions, setCategoryOptions] = useState<
    { label: string; value: string | undefined }[]
  >([{ label: "No filter", value: undefined }]);
  const [collectionOptions, setCollectionOptions] = useState<
    { label: string; value: string | undefined }[]
  >([{ label: "No filter", value: undefined }]);
  useEffect(() => {
    const params = searchParams.get('collection');
    if (params) setSearchCollectionOption(params);
  }, [searchParams, setSearchCollectionOption])

  useQuery("exercise-categories", () => fetchCategories(), {
    onSuccess: (data) => {
      const options = [
        { label: "No filter", value: undefined },
        ...data.map((item) => ({
          label: item.title + " Exercise",
          value: item.id,
        })),
      ];
      setCategoryOptions(options);
    },
  });

  useQuery("exercise-shopEquipments", () => fetchShopEquipments(), {
    onSuccess: (data) => {
      const options = [
        { label: "No Filter", value: undefined },
        ...data.map((item) => ({
          label: item.title,
          value: item.id,
        }))
      ]

      setEquipmentOptions(options);
    }
  })

  useQuery("exercise-shopAllCollections", () => fetchAllCollections(), {
    onSuccess: (data) => {
      const options = [
        { label: "No Filter", value: undefined },
        ...data.map((item) => ({
          label: item.title,
          value: item.id,
        }))
      ]
      setCollectionOptions(options)
    }
  })
  const handleSearchOptionChange = (val: any) => {
    setSearchKeyword(val);
  }
  const handleSortOptionChange = (val: any) => {
    setSearchSortOption(val.value);
    // toast.success(val.label);
  };
  const handleCategoryOptionChange = (val: any) => {
    setSearchCategoryOption(val.value);
    // toast.success(val.value);
  };
  const handleGoalOptionChange = (val: any) => {
    setGoalOption(val);
    setSearchGoalOption(val.value);
    // toast.success(val.value);
  };
  const handleEquipmentOptionChange = (val: any) => {
    let selectedValues
    selectedValues = val.map((option: any) => option.value);
    setSearchEquipmentOption(selectedValues);
    // toast.success(selectedValues.toString());
  };
  const handleCollectionOptionChange = (val: any) => {
    setSearchCollectionOption(val.value);
    // toast.success(val.value);
  };
  const handleRedirect = () => {
    router.push(Pathnames.LIBRARY); // Redirects to the specified path
  };
  const handleReset = () => {
    setSearchCollectionOption('');
    setSearchEquipmentOption([]);
    setSearchCategoryOption('');
    setSearchSortOption('');
  }
  
  if (typeof window === 'undefined') return <div></div>
  return (
    window.location.pathname.includes("dashboard") || window.location.pathname.includes("account") || window.location.pathname.includes("app/library/")?
    <div
      className="w-full pl-1 py-2 pr-5 bg-[#0d0d0d] flex justify-between items-center inset-x-0 top-0"
      onClick={(e) => e.stopPropagation()}
    >
      <SearchField
        setSearchQuery={(val) => {
          handleRedirect();
          setSearchKeyword(val);
          
        }}
      />
      <Button
        color="red"
        className="w-64 px-5 py-2.5"
        placeholder="Full Library Button"
      >
        <Link legacyBehavior href={Pathnames.LIBRARY}>
          <a className="flex m-1">
            <p className="text-center mt-1">Browse the Full Library</p>
          </a>
        </Link>
      </Button>
    </div>:
    <div
      className={`w-full pl-1 py-2 bg-[#0d0d0d] flex inset-x-0 top-0 gap-6`}
      onClick={(e) => e.stopPropagation()}
    >
      <SearchField
        setSearchQuery={(val) => {
          setSearchKeyword(val);
          // handleSearchOptionChange(val);
        }}
      />
      <ReactSelect
        instanceId="React Select"
        styles={reactSelectStylesConfig}
        className="w-56 shrink hover:shrink-0 whitespace-nowrap"
        placeholder="Sort by"
        name="sortby"
        options={SortOptions}
        value={SortOptions.filter((v) => v.value === searchSortOption)}
        onChange={handleSortOptionChange}
      />
      <ReactSelect
        instanceId="React Select"
        styles={reactSelectStylesConfig}
        className="w-48 shrink hover:shrink-0"
        placeholder="Category"
        options={categoryOptions}
        value={categoryOptions.filter((v) => v.value === searchCategoryOption)}
        onChange={handleCategoryOptionChange}
      />
      {/* <ReactSelect
        instanceId="React Select"
        styles={reactSelectStylesConfig}
        className="w-32 shrink hover:shrink-0"
        placeholder="Goal"
        options={GoalOptions}
        value={goalOption}
        onChange={handleGoalOptionChange}
      /> */}
      <ReactSelect
        instanceId="React Select"
        styles={reactSelectStylesConfig}
        className=""
        placeholder="Equipment"
        options={equipmentOptions}
        value={equipmentOptions.filter(option => searchEquipmentOption?.includes(option.value ? option.value : ''))}
        isMulti
        onChange={handleEquipmentOptionChange}
      />
      <ReactSelect
        instanceId="React Select"
        styles={reactSelectStylesConfig}
        className=""
        placeholder="Collection"
        options={collectionOptions}
        value={collectionOptions.filter((v) => v.value === searchCollectionOption)}
        onChange={handleCollectionOptionChange}
      />
      <Button
        color="red"
        className="w-58 px-5 py-1"
        placeholder="Full Library Button"
        onClick={handleReset}
      >
        <Link legacyBehavior href={Pathnames.LIBRARY}>
          <a className="flex m-1">
            <p className="text-center mt-1">Browse the Full Library</p>
          </a>
        </Link>
      </Button>
    </div> 
  );
};
