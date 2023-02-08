import Link from 'next/link';
import {MediaImage} from 'components/media--image';
import React from 'react';
import {formatDate} from "../lib/format-date";
import {FormattedText} from "./formatted-text";
import BackButton from "./backButton";
import {BlockBanner} from "./block--banner";
import { ClipPath } from './shieldMask/shieldMask';
import  { Button } from '../ThemeConfig';
import { BiChevronRight } from 'react-icons/bi';
import classNames from 'classnames';



export function NodeNews({node, ...props}) {
  return (
    <article {...props}>
      {node.field_news_image && (
        <div className="relative block overflow-hidden object-fill no-underline">
          <BackButton></BackButton>
          <MediaImage
            media={node.field_news_image}
            priority
            imageStyle="coh_xx_large_super_landscape"
          />
        </div>
      )}
      <div className="container prose-sm relative mx-auto mt-7 mb-10 px-4 md:mt-16 md:prose md:px-0">
        <span
          className="font-body text-xs font-bold text-secondary-900 md:text-base">{formatDate(node.field_news_date)}</span>
        <h1 className="font-body text-lg font-bold text-secondary-900 md:text-xl">{node.title}</h1>
        {node.body?.processed && (
          <div
            className="prose break-keep font-body text-sm leading-5 text-black-900 dark:prose-invert md:text-lg md:leading-8"
            data-cy="summary">
            <FormattedText processed={node.body.processed}/>
          </div>
        )}
      </div>
      {node?.field_banner.length ? (
        <div className="container relative mx-auto my-12 flex flex-col px-4 sm:items-center">
          {node.field_banner.slice(0, 2).map((banner) => (
            <BlockBanner key={banner.id} banner={banner}/>
          ))}
        </div>
      ) : ''}
    </article>
  );
}

export function NodeCardBig({
                              node,
                              className,
                              ...props
    }) {
    return (
        <article className={classNames("relative rounded-lg]", className)} {...props}>
            <Link href={node.path.alias} passHref className="grid lg:grid-cols-2">
                {node.field_news_image && (
                  <div className="block overflow-hidden object-fill no-underline rounded-t-lg lg:rounded-l-lg lg:rounded-tr-[0]">
                    <MediaImage
                        media={node.field_news_image}
                        priority
                        sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                )}

        <div className="relative px-5 pt-7 pb-10 lg:px-20 lg:pt-8">
          <h2
            className="mb-2 font-body text-lg font-bold md:text-[22px] lg:text-xl">{node.title}</h2>
          {node.body?.summary && (
            <p
              className="break-keep font-body text-sm leading-5 text-black-900 line-clamp-3 md:text-lg lg:text-lg lg:leading-8 lg:line-clamp-5"
              data-cy="summary">
              {node.body.summary}
            </p>
          )}
        </div>

        <CardButton/>

      </Link>
    </article>
  );
}


export function NodeCardSmall({node, size, ...props}) {
  return (
    <article className="relative mt-[90px]  rounded-lg bg-secondary-10 lg:mt-0 lg:ml-[80px]" {...props}>
      <Link href={node.path.alias} passHref className="grid grid-cols-1">
        {node.field_news_image && (
          <div
            className="shieldMask absolute top-[-75px] left-1/2 block aspect-[95/122] max-h-full translate-x-[-50%] overflow-hidden object-fill md:top-[-90px] lg:left-[-17%] lg:top-0 lg:translate-x-[0]">
            <ClipPath></ClipPath>
            <div className="absolute top-0 h-full w-full">
              <MediaImage className="absolute h-full w-full"
                          media={node.field_news_image}
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
        <div className="relative px-5 pt-10 pb-10 min-[425px]:pt-20 min-[530px]:pt-28 min-[640px]:pt-40md:pt-60 lg:pl-32 lg:pr-14 lg:pt-8">
          <h2
            className="mb-3 break-keep font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 md:text-[22px] md:line-clamp-none">{node.title}</h2>
          {node.body?.summary && (
            <p className="break-keep font-body text-sm leading-5 text-black-900 line-clamp-3 md:text-lg md:leading-8"
               data-cy="summary">
              {node.body.summary}
            </p>
          )}
        </div>
        <CardButton small={true}/>

      </Link>
    </article>
  );
}


function CardButton(small) {
  return (
    <Button className={small == true ? 'absolute right-1/2 -bottom-6 translate-x-[50%] grid-cols-1 rounded-full bg-secondary-900 lg:right-3 lg:translate-x-[0%]' : 'absolute right-3 -bottom-6 translate-x-[0%] grid-cols-1 rounded-full bg-secondary-900'}>
      <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
    </Button>
  )
}

