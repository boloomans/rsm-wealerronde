import React from 'react';
import { MediaImage } from 'components/media--image';
import { ClipPath } from './shieldMask/shieldMask';


export function NodePerson({ person, ...props }) {
  return (
    <article className="relative mt-[90px]  rounded-lg bg-secondary-10 lg:mt-0 lg:ml-[80px]" {...props}>
      <div className="grid grid-cols-1">
        {person.field_person_image && (
          <div className="shieldMask absolute top-[-75px] left-1/2 block aspect-[95/122] max-h-full translate-x-[-50%] overflow-hidden object-fill md:top-[-90px] lg:left-[-17%] lg:top-0 lg:translate-x-[0]">
            <ClipPath></ClipPath>
            <div className="absolute top-0 h-full w-full">
              <MediaImage className="absolute h-full w-full"
                          media={person.field_person_image}
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
        <div className="relative px-5 py-10 min-[425px]:pt-20 min-[530px]:pt-28 min-[640px]:pt-40 md:pt-60 lg:pl-32 lg:pr-14 lg:pt-8">
          <h2 className="mb-3 break-keep font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 md:text-[22px] md:line-clamp-none">{person.title}</h2>
          {person.field_job_title && (
            <p className="break-keep font-body text-sm leading-5 text-black-900 line-clamp-3 md:text-lg md:leading-8" data-cy="summary">
              {person.field_job_title}
            </p>
          )}
        </div>


      </div>
    </article>


  );
}



