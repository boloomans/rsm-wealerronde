import Link from 'next/link';
import {MediaImage} from 'components/media--image';
import React from 'react';
import {formatDate} from "../lib/format-date";
import {FormattedText} from "./formatted-text";
import BackButton from "./backButton";
import {BlockBanner} from "./block--banner";
import classNames from 'classnames';
import {CardButton} from "./buttons/button";
import {Button} from "../ThemeConfig";
import {BiChevronRight} from "react-icons/bi";

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
      <article className="mb-6 rounded-lg" {...props}>
        <Link href={node.path.alias} passHref>
          <div className="flex w-full flex-col justify-between lg:flex-row">
            {node.field_news_image && (
              <div className="rounded-t-lg object-fill lg:rounded-l-lg lg:rounded-tr-[0]">
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
            </div>
          </div>
          <CardButton/>
        </Link>
      </article>
  );
}

export function NodeCardSmall({node, size, ...props}) {
  return (
    // <article className="relative mb-6 mt-24 rounded-lg bg-secondary-10 lg:mt-0 lg:ml-[100px] lg:h-5/6" {...props}>
    //   <Link href={node.path.alias} passHref className="flex h-full flex-col flex-wrap justify-between lg:flex-nowrap">
    //     <div className="-mt-24 flex flex-col lg:mt-0 lg:h-full lg:flex-row lg:pb-0">
    <article className="relative mb-6 mt-24 rounded-lg bg-secondary-10 lg:mt-0 lg:ml-[100px]" {...props}>
      <Link href={node.path.alias} passHref className="block">
        <div className="-mt-24 flex flex-col items-center lg:mt-0 lg:h-full lg:flex-row">
          {node.field_news_image && (
                <div className="relative max-h-[125px] max-w-[100px] self-center lg:ml-[-100px] lg:max-h-[230px] lg:max-w-[180px]">
                  <MediaImage
                                  media={node.field_news_image}
                                  priority
                                  fill
                                  mask={true}
                                  imageStyle="coh_small_square"
                                  sizes="(max-width: 1025px) 50vw,
                                                  33vw"
                      />
                </div>
              )}
              <div className="p-6 pb-10 lg:px-12 lg:pb-0">
                <h2
                  className="mb-3 font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 lg:text-xl">{node.title}</h2>
                {node.body?.summary && (
                  <p className="font-body text-sm leading-5 text-black-900 line-clamp-3 lg:text-[16px] lg:leading-8"
                     data-cy="summary">
                    {node.body.summary}
                  </p>
                )}
            </div>
        </div>
        <CardButton small/>
      </Link>
    </article>
  );
}

