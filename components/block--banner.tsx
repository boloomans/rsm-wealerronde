import React, {HTMLAttributes} from 'react';
import {FaRegCalendarAlt} from "react-icons/fa";
import {Button} from "../ThemeConfig";
import {BiChevronRight} from "react-icons/bi";
import Link from "next/link";
import {DrupalBlock} from "next-drupal";
import {absoluteURL} from "../lib/absolute-url";
import {absolutePathToPage} from "next/dist/shared/lib/page-path/absolute-path-to-page";

interface BlockBannerProps {
  heading?: string;
  text?: string;
  banner?: DrupalBlock
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export function BlockBanner({ heading, text, banner, ...props }: BlockBannerProps) {
  return (
    <div className="relative inline-flex max-w-md items-center gap-4 rounded-md bg-primary-900/20 p-4 lg:gap-8 lg:py-12 lg:pl-10" {...props}>
      <div>
        <p className="font-title text-xl font-bold text-primary-900 lg:text-2xl">{banner.title}</p>
        <p className="font-display text-base text-primary-900 lg:text-lg">{banner.field_banner_body.value}</p>
      </div>
      <Link href={absoluteURL(banner.field_banner_link.uri)} passHref>
        <Button className="absolute right-[24px] bottom-[-24px] rounded-full bg-primary-900">
          <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
        </Button>
      </Link>
    </div>
  );
}
