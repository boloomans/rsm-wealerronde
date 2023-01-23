import classNames from 'classnames';
import React, {HTMLAttributes, LinkHTMLAttributes} from 'react';
import Image from "next/image";
import {FaRegCalendarAlt} from "react-icons/fa";
import {Button} from "../ThemeConfig";
import {BiChevronRight} from "react-icons/bi";
import Link from "next/link";

export function BlockBanner({ block, ...props }) {
  return (
    <div className="bg-primary-900 bg-opacity-20 rounded-md p-4 inline-flex gap-4 lg:gap-10 relative" {...props}>
      <div className="bg-primary-900 rounded-xl inline-flex p-3 lg:p-5">
        <FaRegCalendarAlt className="text-[#FFF] text-2xl lg:text-6xl"></FaRegCalendarAlt>
      </div>
      <div>
        <p className="text-white-900 font-display font-bold text-sm lg:text-2xl">De volgende RSM Wealer ronde:</p>
        <p className="text-primary-900 font-display font-bold text-2xl lg:text-6xl">2 juni 2023</p>
      </div>
      <Link href="#" passHref>
        <Button className="bg-primary-900 rounded-full absolute right-[5%] top-[70%]" as="a">
          <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
        </Button>
      </Link>
    </div>
  );
}
