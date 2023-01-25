import React from 'react';
import {FaRegCalendarAlt} from "react-icons/fa";
import {Button} from "../ThemeConfig";
import {BiChevronRight} from "react-icons/bi";
import Link from "next/link";

export function BlockBanner({ block, ...props }) {
  return (
    <div className="relative inline-flex gap-4 rounded-md bg-primary-900/20 p-4 lg:gap-10" {...props}>
      <div className="inline-flex rounded-xl bg-primary-900 p-3 lg:p-5">
        <FaRegCalendarAlt className="text-2xl text-[#FFF] lg:text-6xl"></FaRegCalendarAlt>
      </div>
      <div>
        <p className="font-display text-sm font-bold text-white-900 lg:text-2xl">De volgende RSM Wealer ronde:</p>
        <p className="font-display text-2xl font-bold text-primary-900 lg:text-6xl">2 juni 2023</p>
      </div>
      <Link href="#" passHref>
        <Button className="absolute right-[20px] bottom-[-20px] rounded-full bg-primary-900">
          <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
        </Button>
      </Link>
    </div>
  );
}
