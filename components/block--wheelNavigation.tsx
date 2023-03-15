import React, { HTMLAttributes } from 'react';
import Image from "next/legacy/image";
import Link from "next/link";
import {Button} from "../ThemeConfig";
import {BiChevronRight, BiChevronLeft} from "react-icons/bi";

interface BlockWheelNavigationProps {

}

export function BlockWheel({ ...props }) {
  return (
    <div >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10">
        <div className="border-2 border-primary-900 rounded-full h-[335px] w-[335px]">
          <Image priority src="/fietswiel.png" alt="Fietswiel" layout="fill" />
        </div>
      </div>

      <div className="relative flex justify-around pt-32">
        <div>
          <Button className="rounded-full bg-secondary-900">
            <BiChevronLeft className="text-5xl text-white-900"></BiChevronLeft>
          </Button>
        </div>

        <div>
          <Button className="rounded-full bg-secondary-900">
            <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
          </Button>
        </div>
      </div>
    </div>
  )
}