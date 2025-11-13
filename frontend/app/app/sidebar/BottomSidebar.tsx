import Image from "next/image";
import { SHOP_PATH } from "@/utils/constants/image-paths";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";

interface Props {
  isExpand: boolean;
}


export const BottomSidebar = ({ isExpand }: Props) => {
  const { user } = useAuthStore();
  const progress = [
    {
      title: "Excercises Favourited",
      progress: Math.floor(user?.favorites.length! / 3016 * 200),
    },
    {
      title: "Excercises Watched",
      progress: Math.floor(user?.histories.length! / 3016 * 400),
    },
  ];
  return isExpand ? (
    <div className="mt-auto w-full flex flex-col gap-2 px-2">
      <div className="flex justify-center mt-12 mb-10">
        <Link href="http://ericcressey.com/shop" target="__blank">
          <Image
            src={SHOP_PATH}
            className="rounded h-auto"
            alt="Shop Equipment avatar"
          />
        </Link>
      </div>

      <div className="text-label px-9 pl-5 pr-6 mt-6">
        <div className="mb-6 text-sm font-medium">Progress</div>
        {progress.map((item, index) => {
          return (
            <div key={index} className="mb-5">
              <div className="mb-3 text-xs dark:text-white flex">
                <label className="grow">{item.title}</label>
                <label>{item.progress}%</label>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 mb-4 dark:bg-gray-700">
                <div
                  className="bg-customRed h-full rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};
