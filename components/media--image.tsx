import Image, { ImageProps } from 'next/image';
import { DrupalMedia } from 'next-drupal';

import { absoluteURL } from 'lib/absolute-url';
import React, { CSSProperties } from "react";

import { ClipPath } from './shieldMask/shieldMask';
import classNames from 'classnames';


interface MediaImageProps extends Partial<ImageProps> {
  media: DrupalMedia;
  imageStyle?: string;
  imageStyling?: CSSProperties;
  mask?: boolean;
}

MediaImage.type = 'media--image';

export function MediaImage({
                             media,
                             imageStyle,
                             imageStyling,
                             fill = false,
                             width,
                             height,
                             priority,
                             quality,
                             sizes,
                             placeholder,
                             blurDataURL,
                             loading,
                             mask = false,
                             ...props
                           }: MediaImageProps) {
  const image = media?.image;
  if (!image) {
    return null;
  }
  let sizeProps;
  let srcURL;

  sizeProps = fill
    ? null
    : {
      width: width || image.resourceIdObjMeta.width,
      height: height || image.resourceIdObjMeta.height,
    };
  srcURL = absoluteURL(image.uri.url);

  // Use the image style to render an image if specified.
  if (imageStyle) {
    if (image.links) {
      if (image.links[imageStyle]) {
        const imageStyleSource = image.links[imageStyle];
        sizeProps = {
          width: width || imageStyleSource.meta.linkParams.width,
          height: height || imageStyleSource.meta.linkParams.height,
        };
        srcURL = imageStyleSource.href;
      } else {
        console.warn(
          `${imageStyle} image style does not exist. You must configure the consumer to include the image style to be used by this application.`,
        );
      }
    } else {
      console.warn(
        'Image styles not found. The consumer_image_styles module must be installed and enabled for the consumer of this application.',
      );
    }
  }

  return (
    <div className={classNames('media__content image__wrapper', {
      'shieldMask relative': mask,
    })} {...props}>
      {mask &&
        <ClipPath/>
      }
      <Image
        src={srcURL}
        alt={image.resourceIdObjMeta.alt || 'Image'}
        title={image.resourceIdObjMeta.title}
        priority={priority}
        sizes={sizes}
        fill={fill}
        height={height}
        quality={quality}
        blurDataURL={blurDataURL}
        loading={loading}
        placeholder={placeholder}
        style={(mask ? ({imageStyling, objectFit: 'cover'}) : {imageStyling})}
        {...(!fill ? sizeProps : {})}
      />
    </div>

  );
}
