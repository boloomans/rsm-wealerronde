import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import Image from "next/legacy/image";
import {BlockBanner} from "./block--banner";
import {DrupalBlock} from "next-drupal";
import {FaRegCalendarAlt} from "react-icons/fa";
import Link from "next/link";
import {Button} from "../ThemeConfig";
import {BiChevronRight} from "react-icons/bi";

interface BlockHeroProps {
  heading: string;
  banner?: DrupalBlock,
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

function BlockBannerAgenda({ ...props }) {
  return (
    <div className="relative inline-flex max-w-md items-center gap-4 rounded-md bg-primary-900/20 p-4 lg:gap-8 lg:py-12 lg:pl-10" {...props}>
      <div className="inline-flex rounded-xl bg-primary-900 p-3">
        <FaRegCalendarAlt className="text-2xl text-[#FFF]"></FaRegCalendarAlt>
      </div>
      <div>
        <p className="font-display text-sm font-bold text-white-900 lg:text-lg">De volgende RSM Wealer ronde:</p>
        <p className="font-display text-2xl font-bold text-primary-900 lg:text-2xl">2 juni 2023</p>
      </div>
      <Link href="#" passHref>
        <Button className="absolute right-[20px] bottom-[-20px] rounded-full bg-primary-900">
          <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
        </Button>
      </Link>
    </div>
  );
}

export function BlockHero({ heading, banner, className }: BlockHeroProps) {
  return (
    <div className={classNames('relative', className)}>
      <div className="container relative z-10 mx-auto flex flex-col space-y-4 px-6 py-20 sm:items-center md:space-y-10 lg:py-48">
        <h1 className="font-display text-[22px] font-bold leading-tight text-primary-900 lg:text-3xl">{heading}</h1>
        {banner && <BlockBanner key={undefined}/>}
        <BlockBannerAgenda></BlockBannerAgenda>
      </div>
      <Image priority className="-z-10 object-cover opacity-20 lg:object-custom" src="/hero.jpg" alt="Logo" layout="fill" />
    </div>
  );
}
