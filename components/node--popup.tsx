import { Button } from '../ThemeConfig';
import React, { useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Image from 'next/legacy/image';
import { BiChevronRight } from 'react-icons/bi';
import Link from 'next/link';


export function NodePopup({ ...props}) {
  let [open, setOpen] = useState(false);
  const closeModal = function() {
    setOpen(false);
  }
  const openModal = () => setOpen(true);

  useEffect(()=>{
  setTimeout(()=>{
    openModal()
  }, 2000)
}, [])



  return (
    <div>
      <Popup  open={open} {...props}>

        <div className="container mx-auto flex h-full w-full flex-col items-start justify-start px-6 py-4 lg:w-[50%]">
          <Link className="flex flex-col items-center space-x-2 no-underline focus:outline-none lg:hidden" href="/" passHref>
            <div className="">
              <Image src="/logo.png" alt="Logo" width={83} height={33} />
            </div>
          </Link>

          <div className="f-full relative mt-8 flex w-full justify-start pr-3 md:justify-center">
            <Circle/>
            <Image src="/Willie.png" alt="Willie" width={270} height={345} />
          </div>

          <div className="container prose-sm relative m-auto flex flex-col justify-center px-14">
            <h1 className="mb-0 text-center font-body text-3xl font-bold text-primary-900">2 juni 2023</h1>
              <div
                className="text-md prose self-center break-keep font-body font-bold leading-6 text-black-900 dark:prose-invert md:text-lg md:leading-8"
                data-cy="summary">
                <p className="text-center">Kom de wielrenners toejuichen, tijdens de 37ste editie van de gezelligste ronde van Maastricht .</p>
              </div>
            <Button className="close h-full w-[50px] self-center bg-primary-900 outline-none" type="button" onClick={closeModal}>
              <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
            </Button>
          </div>

        </div>
      </Popup>
    </div>
  );
}

function Circle() {
  return(
    <div className="absolute top-0 left-[15%] h-[340px] w-[340px] translate-x-[-50%] rounded-full bg-primary-10 md:left-1/2"></div>
  )
}




