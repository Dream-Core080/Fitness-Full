import { GoHomeFill } from "react-icons/go";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Pathnames } from "./pathnames";

// Normal User Menu
export const USER_MENU = [
  {
    title: "Home",
    icon: <GoHomeFill />,
    path: Pathnames.DASHBOARD,
  },
  {
    title: "Library",
    icon: <GiWeightLiftingUp />,
    submenu: [
      {
        title: 'Full Library',
        path: Pathnames.LIBRARY,
        query: 'library_type=1'
      },
      {
        title: "Favorites",
        icon: <FaRegBookmark />,
        path: Pathnames.FAVORITES,
      },
      {
        title: 'History',
        path: Pathnames.HISTORY,
        query: 'library_type=0'
      },
      {
        title: 'Recommended',
        path: Pathnames.RECOMMENDED,
        query: 'library_type=2'
      }
    ]
  },
  {
    title: "Account",
    icon: <FaRegUser />,
    submenu: [
      {
        title: 'Profile',
        path: Pathnames.PROFILE,
        query: '',
      },
      {
        title: 'Billing',
        target: 'new',
        path: Pathnames.BILLING,
        query: '',
      }
    ]
  },
];
