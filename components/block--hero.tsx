import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import Image from "next/legacy/image";
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
      <div className="container relative z-10 mx-auto flex flex-col space-y-2 px-6 py-20 lg:py-48">
        <h1 className="font-display text-[22px] font-bold leading-tight text-primary-900 lg:text-5xl">{heading}</h1>
        {banner && <BlockBanner key={undefined} block={undefined}/>}
        <BlockBanner block={undefined}></BlockBanner>
      </div>
      <Image priority className="-z-10 object-cover opacity-20 lg:object-custom" src="/hero.jpg" alt="Logo" layout="fill" />
    </div>
  );
}
