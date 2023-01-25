import { useRouter } from 'next/router'
import {Button} from "../ThemeConfig";
import {BiChevronLeft} from "react-icons/bi";
import React from "react";
import classNames from "classnames";

export default function BackButton(className) {
  const router = useRouter()

  return (
    <div className="m-0 p-0">
      <Button type="button" onClick={() => router.back()} className={classNames("bg-secondary-900 absolute left-3 top-3 grid-cols-1", className)}>
        <BiChevronLeft className="stroke-2 text-3xl text-white-900"></BiChevronLeft>
      </Button>
    </div>
  )
}
