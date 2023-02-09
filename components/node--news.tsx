import Link from 'next/link';
import {MediaImage} from 'components/media--image';
import React from 'react';
import {formatDate} from "../lib/format-date";
import {FormattedText} from "./formatted-text";
import BackButton from "./backButton";
import {BlockBanner} from "./block--banner";
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
        <article className="rounded-lg" {...props}>
            <Link href={node.path.alias} passHref>
              <div className="flex justify-between flex-col lg:flex-row w-full">
                {node.field_news_image && (
                  <div className="object-fill rounded-t-lg lg:rounded-l-lg lg:rounded-tr-[0]">
                    <MediaImage
                      media={node.field_news_image}
                      priority
                      sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                )}

                <div className={classNames("relative px-5 pt-6 pb-11 lg:p-20", className)}>
                  <h2
                    className="mb-2 font-body text-lg font-bold lg:text-xl">{node.title}</h2>
                  {node.body?.summary && (
                    <p
                      className="font-body text-sm leading-5 text-black-900 line-clamp-3 lg:text-[16px] lg:leading-8 lg:line-clamp-5"
                      data-cy="summary">
                      {node.body.summary}
                    </p>
                  )}
                  <CardButton/>
                </div>
              </div>




      </Link>
    </article>
  );
}

export function NodeCardSmall({node, size, ...props}) {
  return (
    <article className="relative rounded-lg bg-secondary-10 h-full lg:h-5/6" {...props}>
      <Link href={node.path.alias} passHref>
        <div className="flex flex-col lg:h-full lg:flex-row">
          {node.field_news_image && (
                <div
                  className="relative aspect-[95/122] w-5/6 self-center">

                <MediaImage
                                media={node.field_news_image}
                                priority
                                fill
                                mask={true}
                                imageStyle="coh_small_square"
                                sizes="(max-width: 768px) 100vw,
                                              (max-width: 1200px) 50vw,
                                              420px"
                    />
                </div>
              )}
              <div className="p-6 lg:px-12 lg:pb-20">
                <h2
                  className="mb-3 font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 lg:text-xl">{node.title}</h2>
                {node.body?.summary && (
                  <p className="font-body text-sm leading-5 text-black-900 line-clamp-3 lg:leading-8 lg:text-[16px]"
                     data-cy="summary">
                    {node.body.summary}
                  </p>
                )}
            </div>
          </div>

        <CardButton small={true}/>

      </Link>
    </article>
  );
}


function CardButton(small) {
  return (
    <div className={small == true ? 'absolute right-4 -bottom-6' : 'absolute right-4 -bottom-6'}>
      <Button className='rounded-full bg-secondary-900'>
        <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
      </Button>
    </div>
  )
}

