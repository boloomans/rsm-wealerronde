import Link from 'next/link';
import {Button} from '../ThemeConfig';
import {BiChevronRight} from 'react-icons/bi';
import React from 'react';
import BackButton from "./backButton";
import Image from "next/image";
import Masonry from 'react-masonry-css';
import Fancybox from "./Fancybox/fancybox";


export function MediaFotobook({media, ...props}) {
  return (
    <article {...props}>
      <BackButton></BackButton>
      <h1
        className="container relative top-3 mx-auto text-center font-title text-xl font-bold text-secondary-900 lg:px-6">{media.name}</h1>
      <div className="container mx-auto mt-7 mb-10 gap-2 px-6 md:mt-16">
        <Fancybox>
          <Masonry
            breakpointCols={{default: 3, 600: 2}}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {media.field_media_image.map((image) => (
              // eslint-disable-next-line tailwindcss/no-custom-classname
              <div key={image.id} className='hover:cursor-pointer'>
                <Image src={image.links.original.href}
                       alt={media.field_media_image[0].filename}
                       style={{
                         objectFit: "cover"
                       }}
                       width={image.resourceIdObjMeta.width}
                       height={image.resourceIdObjMeta.height}
                       priority
                       sizes="50%"
                       data-fancybox="gallery"
                />
              </div>
            ))}
          </Masonry>
        </Fancybox>
      </div>
    </article>
  );
}

function ClipPath() {
  return (
    <svg version="1.1" id="Layer_1" width="100%" height="100%" viewBox="0 0 93.31 120">
      <defs>
        <clipPath id="mask" clipPathUnits="objectBoundingBox">
          <path id="download"
                d="m0.015,0.037 c0.331,-0.051,0.661,-0.05,0.994,0.007 v0.034 c0,0.158,0.003,0.317,0,0.475 c-0.003,0.169,-0.105,0.293,-0.301,0.368 c-0.06,0.023,-0.117,0.051,-0.177,0.075 c-0.01,0.004,-0.029,0.006,-0.037,0.002 c-0.091,-0.043,-0.186,-0.083,-0.272,-0.132 C0.086,0.791,0.017,0.684,0.013,0.555 c-0.005,-0.168,-0.001,-0.335,-0.001,-0.504 c0,-0.004,0.002,-0.01,0.003,-0.015"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export function MediaFotobookTeaser({media, ...props}) {
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (media.field_media_image.length - 1));
  }
  return (
    <article className="relative mt-[90px] rounded-lg bg-secondary-10 md:mt-0 md:ml-[80px]" {...props}>
      <Link href={media.path.alias} passHref className="grid h-full grid-cols-1">
        {media.field_media_image && (
          <div
            className="shieldMask absolute top-[-90px] left-1/2 block aspect-[95/122] max-h-full w-3/5 translate-x-[-50%] overflow-hidden object-fill md:left-[-17%] md:top-0 md:w-2/6 md:translate-x-[0]">
            <ClipPath></ClipPath>
            <div className="absolute top-0 h-full w-full">
              <Image src={media.field_media_image[generateRandomNumber()].links.coh_small_square.href}
                     alt={media.field_media_image[0].filename}
                     style={{
                       objectFit: "cover"
                     }}
                     fill
                     sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        420px"
              />
            </div>
          </div>
        )}
        <div className="relative px-5 pt-14 pb-10 md:pl-32 md:pr-14 md:pt-8">
          <h2
            className="mb-3 break-keep font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 md:text-[22px] md:line-clamp-none">{media.name}</h2>
          {media.field_description && (
            <p className="break-keep font-body text-sm leading-5 text-black-900 line-clamp-3 md:text-lg md:leading-8"
               data-cy="summary">
              {media.field_description.value}
            </p>
          )}
          <div className="m-0 p-0">
            <Button
              className="absolute right-1/2 -bottom-6 translate-x-[50%] grid-cols-1  rounded-full bg-secondary-900 md:right-4 md:translate-x-[0%]">
              <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}
