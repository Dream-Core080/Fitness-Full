import Image from "next/image";
import { HiOutlineBars3 } from "react-icons/hi2";
import { PROFILE_PATH } from "@/utils/constants/image-paths";
import { useAuthStore } from "@/stores/auth";
import { useCallback } from "react";

interface Props {
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopSidebar = ({ isExpand, setIsExpand }: Props) => {
  const { user } = useAuthStore();
  const AvatarWrapper = useCallback(
    () => (
      <div
        className={`relative ${
          isExpand ? "w-[110px] h-[110px]" : "w-12 h-12"
        } `}
      >
        <Image
          className="rounded-full"
          src={user?.avatarUrl ? user.avatarUrl : PROFILE_PATH}
          alt="Profile Picture"
          fill={true}
        />
      </div>
    ),
    [isExpand, user?.avatarUrl]
  );

  return (
    <div className={`w-full gap-2 items-center justify-between`}>
      <HiOutlineBars3
        className={`w-6 h-6 text-white font-bold cursor-pointer transform 
        ${isExpand ? "rotate-0 mt-2 ml-7" : "rotate-180 left-7 mx-auto"}`}
        onClick={() => setIsExpand((p) => !p)}
      />
      <div className="p-2 w-full mt-2">
        <div className="flex-col justify-center text-center items-center">
          <div className="flex justify-center relative block">
            <AvatarWrapper />
            <span
              className={`absolute w-5 h-5 bg-[#79d916] dark:border-gray-800 rounded-full top-full 
                -translate-y-6 ${isExpand ? "right-1/4" : "right-0"}`}
            ></span>
          </div>
          <div className="relative block text-label text-sm mt-2">
            {user?.firstname} {user?.lastname}
          </div>
        </div>
      </div>
    </div>
  );
};
