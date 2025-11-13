import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { clsx } from "clsx";

import { signOut } from "firebase/auth";
import { reactQueryConfig } from "@/libs/react-query";
import { USER_MENU } from "@/utils/constants/menu-data";
import { auth } from "@/utils/firebase-util";
import { Pathnames } from "@/utils/constants/pathnames";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";

interface Props {
  isExpand: boolean;
}

export const MenuSidebar = ({ isExpand }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setUser, setIsLogged } = useAuthStore();
  const [activeSubmenu, setActiveSubmenu] = useState("");

  const { resetFilters } = useFilterStore()

  useEffect(() => {
    USER_MENU.forEach((item) => {
      if (item.submenu) {
        item.submenu.forEach((subItem) => {
          if (pathname === subItem.path || (subItem.query && searchParams.toString().includes(subItem.query))) {
            setActiveSubmenu(item.title);
          }
        });
      }
    });

    resetFilters();
  }, [pathname, searchParams, resetFilters]);


  const onSignOut = () => {
    signOut(auth);
    localStorage.clear();
    sessionStorage.clear();
    reactQueryConfig.clear();
    setUser(null);
    setIsLogged(false);
    router.push(Pathnames.LOGIN);
  };

  return (
    <nav className="flex flex-col gap-1 w-full">
      {USER_MENU.map((item: any) => {
        const isActiveLink =
          (item.path != "/" && pathname.startsWith(item.path)) ||
          pathname == item.path ||
          item?.submenu?.some((temp: any) => temp.path === pathname && (!temp.query || searchParams.toString().includes(temp.query)));
        return (
          <div key={item.title}>
            <Link
              href={item.path || ""}
              className={`w-full flex items-center justify-between text-label hover:bg-[#333] ${isExpand ? "pr-5" : "pr-0"
                }`}
              onClick={() => {
                if (item.submenu?.length)
                  setActiveSubmenu((p) => (p === item.title ? "" : item.title));
                else setActiveSubmenu("");
              }}
            >
              <div
                className={`flex items-center gap-0 ${isExpand ? "w-fit" : "w-full"
                  }`}
              >
                <span
                  className={`flex items-center justify-center bg-transparent text-2xl ${isExpand ? "w-14 h-14 ml-5" : "w-12 h-12 mx-auto"
                    } ${isActiveLink ? "text-customRed" : ""}
                  `}
                >
                  {item.icon}
                </span>
                {isExpand && (
                  <span
                    className={`text-sm leading-sm  ${isActiveLink ? "text-customRed" : ""
                      }`}
                  >
                    {item.title}
                  </span>
                )}
              </div>
              {isExpand && !isActiveLink && <FiChevronRight />}
            </Link>
            {item.submenu?.length && activeSubmenu === item.title ? (
              <div
                className={`relative flex flex-col ${isExpand ? "pl-[45px]" : "pl-[32px]"
                  }`}
              >
                {item.submenu.map((subItem: any) => {
                  const isActiveLink = pathname === subItem.path && !searchParams.toString().includes('library_type') || (subItem.query && searchParams.toString().includes(subItem.query));
                  return (
                    <Link
                      key={subItem.path}
                      href={subItem.path}
                      target={subItem.target}
                      className={clsx("p-3 w-full hover:bg-[#333]", {
                        active: isActiveLink,
                      })}
                    >
                      <span
                        className={`flex items-center gap-3 text-sm leading-sm ${isActiveLink
                          ? "font-semibold text-customRed"
                          : "text-label"
                          }`}
                      >
                        <VscTypeHierarchySub className="w-4 h-4" />
                        {isExpand && subItem.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}

      <div
        className={`w-full flex items-center justify-between cursor-pointer hover:bg-[#333] ${isExpand ? "pr-5" : "pr-0"
          }`}
        onClick={onSignOut}
      >
        <div
          className={`flex items-center gap-0 ${isExpand ? "w-fit" : "w-full"}`}
        >
          <span
            className={`flex items-center justify-center bg-transparent text-2xl text-label ${isExpand ? "w-14 h-14 ml-4 mr-1" : "w-12 h-12 ml-3"
              } `}
          >
            <BiLogOut />
          </span>
          {isExpand && (
            <span className="text-sm leading-sm text-label">Sign Out</span>
          )}
        </div>
      </div>
    </nav>
  );
};
