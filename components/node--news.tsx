import Link from 'next/link';
import {MediaImage} from 'components/media--image';
import {Button} from '../ThemeConfig';
import {BiChevronRight} from 'react-icons/bi';
import React from 'react';
import {formatDate} from "../lib/format-date";
import {FormattedText} from "./formatted-text";
import BackButton from "./backButton";
import {BlockBanner} from "./block--banner";


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

export function NodeCardBig({node, ...props}) {
  return (
    <article className="rounded-lg bg-secondary-10" {...props}>
      <Link href={node.path.alias} passHref className="grid md:grid-cols-2">
        {node.field_news_image && (
          <div className="block overflow-hidden rounded-t-lg object-fill no-underline md:rounded-l-lg">
            <MediaImage
              media={node.field_news_image}
              priority
              sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <div className="relative px-5 pt-7 pb-10 md:px-20 md:pt-8">
          <h2 className="mb-2  font-body text-lg font-bold text-secondary-900 md:text-xl">{node.title}</h2>
          {node.body?.summary && (
            <p
              className="break-keep font-body text-sm leading-5 text-black-900 line-clamp-3 md:text-lg md:leading-8 md:line-clamp-5"
              data-cy="summary">
              {node.body.summary}
            </p>
          )}
          <div className="m-0 p-0">
            <Button className="absolute right-3 -bottom-6 grid-cols-1 rounded-full bg-secondary-900">
              <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
            </Button>
          </div>
        </div>
      </Link>
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

export function NodeCardSmall({node, ...props}) {
  return (
    <article className="relative mt-[90px]  rounded-lg bg-secondary-10 md:mt-0 md:ml-[80px]" {...props}>
      <Link href={node.path.alias} passHref className="grid grid-cols-1">
        {node.field_news_image && (
          <div
            /* eslint-disable-next-line tailwindcss/no-custom-classname */
            className="shieldMask aspect-[95 / 122] absolute top-[-90px] left-1/2 block max-h-full w-3/5 translate-x-[-50%] overflow-hidden object-fill md:left-[-17%] md:top-0 md:w-2/6 md:translate-x-[0]">
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
        <div className="relative px-5 pt-14 pb-10 md:pl-32 md:pr-14 md:pt-8">
          <h2
            className="mb-3 break-keep font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 md:text-[22px] md:line-clamp-none">{node.title}</h2>
          {node.body?.summary && (
            <p className="break-keep font-body text-sm leading-5 text-black-900 line-clamp-3 md:text-lg md:leading-8"
               data-cy="summary">
              {node.body.summary}
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
