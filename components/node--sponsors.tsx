import Link from 'next/link';
import { MediaImage } from 'components/media--image';
import { FormattedText } from 'components/formatted-text';
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export function NodeSponsor({ node, ...props }) {
  return (
    <article {...props}>
      <div className="mx-auto grid w-full max-w-4xl items-start gap-10 px-6 pt-12 md:grid-cols-2">
        {node.field_place_image && (
          <Link className="block overflow-hidden rounded-md no-underline" href={node.path.alias} passHref>
            <MediaImage
              media={node.field_place_image}
              priority
              sizes="(min-width: 968px) 405px, (min-width: 768px) 50vw, 100vw"
            />
          </Link>
        )}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{node.title}</h1>
          {node.field_place_address && (
            <div>
              {node.field_place_address.address_line1}
              <br />
              {node.field_place_address.locality},{' '}
              {node.field_place_address.administrative_area}{' '}
              {node.field_place_address.postal_code}
            </div>
          )}
          {node.field_place_telephone && <p>{node.field_place_telephone}</p>}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">
        {node.body?.processed && (
          <div className="prose">
            <FormattedText processed={node.body.processed} />
          </div>
        )}
      </div>
    </article>
  );
}

function SponsorLogo({ logo, ...props }) {
  return(
      <div {...props}>
        {logo.field_logo && (
          <Link className="block overflow-hidden rounded-md bg-white-900 no-underline hover:shadow-black-900 hover:drop-shadow-[0_3px_6px_rgba(214,214,214,1)]" href={logo.field_website_link.uri} target={'_blank'} passHref>
            <MediaImage className="p-4"
                        media={logo.field_logo}
                        priority
                        sizes="(min-width: 968px) 425px, (min-width: 768px) 50vw, 100vw"
            />
          </Link>
        )}
      </div>
  )
}

function SponsorSwiper() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={5}
      autoplay={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};




export function NodeSponsorTeaser({ sponsor, ...props }) {
  return (
    <article className="mx-auto w-full grid-cols-5 items-start gap-10 space-y-4 md:grid md:space-y-0" {...props}>

      {/*<SponsorLogo logo={sponsor}></SponsorLogo>*/}

      <SponsorSwiper></SponsorSwiper>
    </article>
  );
}

