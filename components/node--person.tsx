import Link from 'next/link';
import { MediaImage } from 'components/media--image';
import { FormattedText } from 'components/formatted-text';
import React from 'react';

export function NodePerson({ node, ...props }) {
  return (
    <article className="relative mt-[90px]  rounded-lg bg-secondary-10 lg:mt-0 lg:ml-[80px]" {...props}>
      <div className="grid grid-cols-1">
        {node.field_person_image && (
          <div className="block overflow-hidden object-fill shieldMask absolute top-[-90px] left-1/2 translate-x-[-50%]  aspect-{95 / 122} w-3/5 lg:w-2/6 lg:left-[-17%] lg:translate-x-[0] lg:top-0 max-h-full">
            <ClipPath></ClipPath>
            <div className="absolute top-0 h-full w-full">
              <MediaImage className="absolute h-full w-full"
                          media={node.field_person_image}
                          priority
                          fill
                          imageStyle="coh_small_square"
                          imageStyling={{
                            objectFit: "cover"
                          }}
                          sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        420px"
              />
            </div>
          </div>
        )}
        <div className="relative px-5 pt-14 pb-10 md:pt-60 lg:pl-32 lg:pr-14 lg:pt-8">
          <h2 className="mb-3 break-keep font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 md:text-[22px] md:line-clamp-none">{node.name}</h2>
          {node.body?.summary && (
            <p className="break-keep font-body text-sm leading-5 text-black-900 line-clamp-3 md:text-lg md:leading-8" data-cy="summary">
              {node.body.summary}
            </p>
          )}
        </div>


      </div>
    </article>
  );
}

function ClipPath() {
  return(
    <svg version="1.1" id="Layer_1" width="100%" height="100%" viewBox="0 0 93.31 120">
      <defs>
        <clipPath id="mask" clipPathUnits="objectBoundingBox">
          <path id="download" d="m0.015,0.037 c0.331,-0.051,0.661,-0.05,0.994,0.007 v0.034 c0,0.158,0.003,0.317,0,0.475 c-0.003,0.169,-0.105,0.293,-0.301,0.368 c-0.06,0.023,-0.117,0.051,-0.177,0.075 c-0.01,0.004,-0.029,0.006,-0.037,0.002 c-0.091,-0.043,-0.186,-0.083,-0.272,-0.132 C0.086,0.791,0.017,0.684,0.013,0.555 c-0.005,-0.168,-0.001,-0.335,-0.001,-0.504 c0,-0.004,0.002,-0.01,0.003,-0.015"/>
        </clipPath>
      </defs>
    </svg>
  )
}


