import React, { HTMLAttributes } from 'react';
import Image from "next/legacy/image";
import Link from "next/link";
import {Button} from "../ThemeConfig";
import {BiChevronRight} from "react-icons/bi";

interface BlockWheelNavigationProps {

}

export function BlockWheel({ ...props }) {
  return (
    <div className="absolute">
      <div className="border-solid border-2 border-primary-900 rounded-full h-[335px] w-[335px]"></div>
      <Image priority className="left-center bottom-0 -z-10 h-full" src="/fietswiel.png" alt="Fietswiel" layout="fill" />
      <div>
        <Link href="#" passHref>
          <Button className="absolute right-[20px] bottom-[-20px] rounded-full bg-secondary-900">
            <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
          </Button>
        </Link>
      </div>
    </div>
  )
}