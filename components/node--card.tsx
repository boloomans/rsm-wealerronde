import Link from 'next/link';
import { MediaImage } from 'components/media--image';
import { Button } from '../ThemeConfig';
import { BiChevronRight } from 'react-icons/bi';
import React from 'react';
import Image from 'next/image';



export function NodeCard({ node, ...props }) {
    return (
        <article className="grid bg-secondary-10 rounded-lg md:grid-cols-2" {...props}>
            {node.field_article_image && (
                <Link className="block overflow-hidden no-underline rounded-t-lg md:rounded-l-lg object-fill" href={node.path.alias} passHref>
                    <MediaImage
                        media={node.field_article_image}
                        priority
                        sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
                    />
                </Link>
            )}
            <div className="relative px-5 pt-7 pb-10 md:px-20 md:pt-8">
                <Link className="no-underline text-secondary-900" href={node.path.alias} passHref>
                    <h2 className="mb-2 text-lg md:text-xl font-bold font-body">{node.title}</h2>
                </Link>
                {node.body?.summary && (
                    <p className="text-sm font-body leading-5 md:leading-8 break-keep text-sm md:text-lg text-black-900 line-clamp-3 md:line-clamp-5" data-cy="summary">
                        {node.body.summary}
                    </p>
                )}
                <div className="m-0 p-0">
                    <Button className="bg-secondary-900 rounded-full absolute right-3 -bottom-6 grid-cols-1">
                        <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
                    </Button>
                </div>
            </div>
        </article>
    );
}

export function NodeCardSmall({ node, ...props }) {
    console.log(node);
    return (
        <article className="grid bg-secondary-10 rounded-lg grid-cols-1 relative mt-[90px] md:m-0" {...props}>
            {node.field_article_image && (
                <Link className="block overflow-hidden object-fill absolute top-[-90px] left-1/2 translate-x-[-50%] shieldMask aspect-{95 / 122} w-3/5 md:w-2/5 md:left-[-20%] md:translate-x-[0] md:top-0 max-h-full" href={node.path.alias} passHref>
                    <svg version="1.1" id="Layer_1" width="100%" height="100%" viewBox="0 0 93.31 120">
                        <defs>
                            <clipPath id="mask" clipPathUnits="objectBoundingBox">
                                <path id="download" d="m0.015,0.037 c0.331,-0.051,0.661,-0.05,0.994,0.007 v0.034 c0,0.158,0.003,0.317,0,0.475 c-0.003,0.169,-0.105,0.293,-0.301,0.368 c-0.06,0.023,-0.117,0.051,-0.177,0.075 c-0.01,0.004,-0.029,0.006,-0.037,0.002 c-0.091,-0.043,-0.186,-0.083,-0.272,-0.132 C0.086,0.791,0.017,0.684,0.013,0.555 c-0.005,-0.168,-0.001,-0.335,-0.001,-0.504 c0,-0.004,0.002,-0.01,0.003,-0.015"/>
                            </clipPath>
                        </defs>
                    </svg>


                    <div className="absolute top-0 w-full h-full">

                        <MediaImage className="w-full h-full"
                                    media={node.field_article_image}
                                    priority
                                    layout="fill"
                                    objectFit="cover"
                                    sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </Link>
            )}
            <div className="relative px-5 pt-14 pb-10 md:px-20 md:pt-8">
                <Link className="no-underline text-secondary-900" href={node.path.alias} passHref>
                    <h2 className="mb-3 line-clamp-3 leading-6 md:line-clamp-none break-keep text-lg md:text-[22px] font-bold font-body">{node.title}</h2>
                </Link>
                {node.body?.summary && (
                    <p className="text-sm font-body leading-5 md:leading-8 break-keep text-sm md:text-lg text-black-900 line-clamp-3" data-cy="summary">
                        {node.body.summary}
                    </p>
                )}
                <div className="m-0 p-0">
                    <Button className="bg-secondary-900 rounded-full absolute right-1/2 translate-x-[50%]  md:right-4 md:translate-x-[0%] -bottom-6 grid-cols-1">
                        <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
                    </Button>
                </div>
            </div>
        </article>
    );
}
