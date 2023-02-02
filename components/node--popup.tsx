import { Button } from '../ThemeConfig';
import React, { useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Image from 'next/legacy/image';
import { BiChevronRight } from 'react-icons/bi';


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
    <div className="m-0 w-screen h-screen">
      <Popup  open={open} {...props}>
        <div className="relative w-0 h-0 mt-24">
          <Circle/>
          <Image priority className=" " src="/Willie.png" alt="Logo" layout="fill" />
        </div>
        <div className="container flex flex-wrap justify-center prose-sm relative mx-auto mt-7 mb-10 px-4">
          <h1 className="font-body text-lg font-bold text-primary-900 text-center">2 juni 2023</h1>
            <div
              className="prose break-keep font-body text-sm leading-5 text-black-900 dark:prose-invert md:text-lg md:leading-8"
              data-cy="summary">
              <p className="text-center">Kom de wielrenners toejuichen, tijdens de 37ste editie van de gezelligste ronde van Maastricht .</p>
            </div>
          <Button className="bg-primary-900 close w-[50px] h-[50px]" type="button" onClick={closeModal}>
            <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
          </Button>
        </div>
      </Popup>
    </div>
  );
}

function Circle() {
  return(
    <div className="absolute top-0 -left-1/2 bg-primary-10 w-[450px] h-[450px] rounded-full"></div>
  )
}




