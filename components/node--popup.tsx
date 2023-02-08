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

        <div className="container w-full h-full flex flex-col justify-start items-start mx-auto px-6 py-4 lg:w-[50%]">
          <Link className="flex flex-col items-center space-x-2 no-underline focus:outline-none lg:hidden" href="/" passHref>
            <div className="">
              <Image src="/logo.png" alt="Logo" width={83} height={33} />
            </div>
          </Link>

          <div className="relative flex justify-start w-full f-full mt-8 pr-3 md:justify-center">
            <Circle/>
            <Image src="/Willie.png" alt="Willie" width={270} height={345} />
          </div>

          <div className="container flex flex-col justify-center prose-sm relative m-auto px-14">
            <h1 className="font-body text-3xl font-bold text-primary-900 text-center mb-0">2 juni 2023</h1>
              <div
                className="prose break-keep font-body font-bold text-md self-center leading-6 text-black-900 dark:prose-invert md:text-lg md:leading-8"
                data-cy="summary">
                <p className="text-center">Kom de wielrenners toejuichen, tijdens de 37ste editie van de gezelligste ronde van Maastricht .</p>
              </div>
            <Button className="bg-primary-900 self-center close w-[50px] h-full outline-none" type="button" onClick={closeModal}>
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
    <div className="absolute top-0 left-[15%] translate-x-[-50%] md:left-1/2 bg-primary-10 w-[340px] h-[340px] rounded-full"></div>
  )
}




