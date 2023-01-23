import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import Image from "next/image";
import {FaRegCalendarAlt} from "react-icons/fa";
import {Button} from "../ThemeConfig";
import {BiChevronRight} from "react-icons/bi";
import Link from "next/link";
import {BlockBanner} from "./block--banner";
import {DrupalBlock} from "next-drupal";

interface BlockHeroProps {
  heading: string;
  banner?: DrupalBlock,
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export function BlockHero({ heading, banner, className }: BlockHeroProps) {
  return (
    <div className={classNames('relative', className)}>
      <div className="z-10 relative flex flex-col space-y-2 px-6 py-20 lg:py-48 mx-auto container">
        <h1 className="font-display font-bold text-primary-900 text-[22px] lg:text-5xl leading-tight">{heading}</h1>
        {banner && <BlockBanner key={undefined} block={undefined}/>}
        <BlockBanner block={undefined}></BlockBanner>
      </div>
      <Image className="-z-10 opacity-20 object-cover lg:object-custom" src="/hero.jpg" alt="Logo" layout="fill" />
    </div>
  );
}
