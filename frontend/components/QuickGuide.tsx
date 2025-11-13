import { useState } from "react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Accordion_Anim = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

interface IconProps {
  id: Number;
  open: Number;
}

const Icon = ({ id, open }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export type Props = {
  guide: string|undefined;
};

export default function QuickGuide({ guide }: Props) {
  const [openQuickGuide, setOpenQuickGuide] = useState(1);
  const handleQuickGuide = (value: number) =>
    setOpenQuickGuide(openQuickGuide === value ? 0 : value);

  return (
    <Accordion
      className="px-6 py-1 rounded-lg mt-8 bg-[#0d0d0d]"
      open={openQuickGuide === 1}
      icon={<Icon id={1} open={openQuickGuide} />}
      animate={Accordion_Anim}
      placeholder="Accordion"
    >
      <AccordionHeader
        className="text-white text-[1rem] hover:text-white border-none"
        onClick={() => handleQuickGuide(1)}
        placeholder="Accordion Header"
      >
        Quick Guide
      </AccordionHeader>
      <AccordionBody className="text-white/60 font-jakarta">
        {guide}
      </AccordionBody>
    </Accordion>
  );
}
