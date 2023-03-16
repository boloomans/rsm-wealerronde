import Link from 'next/link';
import { MediaImage } from 'components/media--image';
import { FormattedText } from 'components/formatted-text';
import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import { DrupalNode } from 'next-drupal';
import { height } from 'dom7';


interface Sponsorsprops {
  sponsors?: DrupalNode[];
  logo?: any;
}

export function NodeSponsor({node, ...props}) {
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
              <br/>
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
            <FormattedText processed={node.body.processed}/>
          </div>
        )}
      </div>
    </article>
  );
}


//Sponsors klein blok
export function NodeSponsorTeaser({sponsors, ...props}: Sponsorsprops) {
  const [mQuery, setMQuery] = useState<any>({
    matches: window.innerWidth > 768,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener('change', setMQuery);
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeEventListener('change', ev => setMQuery(ev.matches));
  }, []);
  // MediaQueryListEvent { isTrusted: true, media: "(min-width: 768px)", matches: true ...}

  if(mQuery && !mQuery.matches){
    return (
      <section className="mx-auto grid h-full w-full auto-rows-max grid-cols-2 place-items-center gap-4 space-y-4 md:space-y-0" {...props}>
        {sponsors.map((sponsor) => (
          <SponsorLogo key={sponsor.id} logo={sponsor}/>
        ))}
      </section>
    )
  } else {
    return (
      <section className="mx-auto h-full w-full" {...props}>
        <SponsorSwiper sponsors={sponsors}></SponsorSwiper>
      </section>
    )
  }
}

//Swiper
function SponsorSwiper({sponsors, ...props}) {
  return (
    <div  {...props}>
      {sponsors?.length ? (
        <Swiper className="h-[120px]"
          modules={[ Autoplay ]}
          spaceBetween={40}
          slidesPerView={5}
          autoplay={{
            delay: 5000
          }}

          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}

        >
          {sponsors.map((sponsor) => (
            <SwiperSlide key={sponsor.id} className="">
              <SponsorLogo logo={sponsor}/>
            </SwiperSlide>
          ))}

        </Swiper>
      ) : (
        <p>Geen resultaten gevonden.</p>
      )}
    </div>
  );
}

//Logo Image
function SponsorLogo({logo, ...props}) {
  return (
    <div {...props} className="m-0 h-full hover:shadow-black-900 hover:drop-shadow-[0_3px_6px_rgba(214,214,214,1)]">
      {logo.field_logo && (
        <Link
          className="block h-full overflow-hidden rounded-md bg-white-900 no-underline"
          href={logo.field_website_link.uri} target={'_blank'} passHref>
          <MediaImage className="h-full p-4"
                      media={logo.field_logo}
                      imageStyling={{
                        objectFit: "contain",
                        height: "100%"
                      }}
                      priority
                      sizes="(min-width: 968px) 425px, (min-width: 768px) 50vw, 100vw"
          />
        </Link>
      )}
    </div>
  )
}
