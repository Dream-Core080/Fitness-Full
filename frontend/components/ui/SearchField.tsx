import { BiSearch } from "react-icons/bi";

import useDebounce from "@/utils/hooks/useDebounce";
import { useState } from "react";

interface Props {
  setSearchQuery: (value: any) => void;
}

export const SearchField = ({ setSearchQuery }: Props) => {
  const { debounce } = useDebounce();
  const [keyword, setKeyword] = useState("");

  return (
    <div className="relative items-center h-12 ml-7">
      <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl" />
      <input
        type="text"
        name="searchkey"
        placeholder="Search any exercise ..."
        className="bg-[#161616] border-[#fff] rounded-[12px] text-white p-3 pl-12 w-full w-48 2xl:w-64 leading-sm text-[14px] placeholder:text-dark h-[49px]"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          debounce(() => setSearchQuery(e.target.value));
        }}
      />
    </div>
  );
};
