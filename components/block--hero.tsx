import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import Image from "next/image";
import {FaRegCalendarAlt} from "react-icons/fa";

interface BlockHeroProps {
  heading: string;
  banner?: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export function BlockHero({ heading, banner, className }: BlockHeroProps) {
  return (
    <div className={classNames('relative', className)}>
      <div className="z-10 relative flex flex-col space-y-2 px-6 py-32 lg:py-48 mx-auto container">
        <h1 className="font-display font-bold text-primary-900 text-[22px] lg:text-5xl leading-tight">{heading}</h1>
        {banner && <p className="text-2xl font-light text-gray-600">{banner}</p>}

        <div className="bg-primary-900 bg-opacity-20 rounded-lg">
          <div className="bg-primary-900 rounded-2xl inline-block p-3">
            <FaRegCalendarAlt className="text-[#FFF] text-4xl"></FaRegCalendarAlt>
          </div>
        </div>
      </div>
      <Image className="-z-10 opacity-20 object-cover lg:object-custom" src="/hero.jpg" alt="Logo" layout="fill" />
    </div>
  );
}
