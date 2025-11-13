import { useState } from "react";

import { TopSidebar } from "./TopSidebar";
import { MenuSidebar } from "./MenuSidebar";
import { BottomSidebar } from "./BottomSidebar";

export const Sidebar = () => {
  const [isExpand, setIsExpand] = useState(true);

  return (
    <div
      className={`h-full bg-[#0d0d0d] shadow-sidebar py-6 flex flex-col items-start gap-14 overflow-y-auto mr-[1px] ${isExpand ? "w-[220px]" : "w-[80px]"
        }`}
      onClick={(e) => e.stopPropagation()}
    >
      <TopSidebar isExpand={isExpand} setIsExpand={setIsExpand} />
      <MenuSidebar isExpand={isExpand} />
      <BottomSidebar isExpand={isExpand} />
    </div>
  );
};
