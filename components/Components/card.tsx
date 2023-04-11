import Link from 'next/link';
import { MediaImage } from 'components/media--image';
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CardButton } from "../buttons/button";
import { absoluteURL } from '../../lib/absolute-url';

const cardStyles = {

}

export function NodeCard({
                           node,
                           className,
                           ...props
                         }) {
  let itemContent = (
    <Link href={node.path.alias} passHref>
      <CardBody {...props} node={node} className={className}/>
      {/*<CardBody node={node} className={className} imageResponsive={imageResponsive} button={button}/>*/}
    </Link>
  )
  console.log(props)
  if (node.field_inline_link) {
    itemContent = (
      <CardBody node={node} className={className} linkInside={true} {...props}/>
    )
  }
  return (
    <article className={classNames('relative rounded-lg mb-6 ', {'mt-24  lg:mt-0 lg:ml-[100px]': props.small}, className)}>
      {itemContent}
    </article>
  );
}

function CardBody({
                    ...props
                  }) {
  const node = props.node
  const link = node.field_inline_link?.uri || node.path.alias
  const image = node.field_event_image || node.field_news_image
  return (
    <>
      <div className={classNames('flex flex-col lg:flex-row',{'-mt-24 items-center lg:mt-0 lg:h-full': props.small}, {'w-full justify-between': props.large})}>
        {image && (
          <div className={classNames("relative", {'max-h-[125px] max-w-[100px] self-center lg:ml-[-100px] lg:max-h-[230px] lg:max-w-[180px]': props.small}, {'rounded-t-lg lg:rounded-l-lg lg:rounded-tr-[0]': props.large})}>
            {props.large ? (
              <MediaImage
                media={image}
                priority
                sizes="(max-width: 1025px) 1000vw, 50vw"
              />
            ) : (
              <MediaImage
                media={image}
                priority
                fill
                mask={true}
                imageStyle="coh_small_square"
                sizes="(max-width: 1025px) 50vw, 33vw"
              />
            )}

            {/*{props.small && (*/}
            {/*  <MediaImage*/}
            {/*    media={image}*/}
            {/*    priority*/}
            {/*    fill*/}
            {/*    mask={true}*/}
            {/*    imageStyle="coh_small_square"*/}
            {/*    sizes="(max-width: 1025px) 50vw, 33vw"*/}
            {/*  />*/}
            {/*)}*/}
          </div>
        )}
        <div className={classNames("relative ", {'w-full p-5 pb-10 md:p-6 lg:px-12 lg:pb-0': props.small}, {'rounded px-5 pt-6 pb-11 lg:p-20': props.large}, props.className)}>
          {props.linkInside && (
            <Link href={absoluteURL(node.field_inline_link.uri)} passHref>{node.field_inline_link.title}</Link>
          )}
          <h2
            className="mb-2 font-body text-lg font-bold lg:text-xl">{node.title}</h2>
          {node.body?.summary && (
            <p
              className="font-body text-sm leading-5 text-black-900 line-clamp-3 lg:text-[16px] lg:leading-8 lg:line-clamp-5"
              data-cy="summary">
              {node.body.summary}
            </p>
          )}
          {node.field_event_distance && (
            <p> {node.field_event_distance}</p>
          )}
        </div>
      </div>
      {props.button && props.large && (
        <CardButton/>
      )}
      {props.button && props.small && (
        <CardButton small/>
      )}

      {props.time && (
        <Time/>
      )}
    </>
  )
}

function Time({time = "19:00"}) {
  return (
    <div className="relative -mt-6 flex justify-center">
      <p className="h-[65px] w-[65px] rounded-full bg-primary-900 px-2 py-4 text-xl text-white-900">{time}</p>
    </div>
  )
}


// export function NodeCardExample({node, size, ...props}) {
//   return (
//     <article className=" lg:h-5/6 mt-36 lg:mt-0 lg:ml-[100px]" {...props}>
//
//       <Link href={node.path.alias} passHref className="flex flex-wrap lg:flex-nowrap justify-between h-full flex-col">
//         <div className="flex flex-col lg:h-full lg:flex-row -mt-36 lg:mt-0 lg:pb-0">
//           {node.field_event_image && (
//             <div
//               className="relative w-5/6 self-center max-w-[125px] lg:max-w-[200px] lg:-ml-[100px]">
//
//               <MediaImage
//                 media={node.field_event_image}
//                 priority
//                 fill
//                 mask={true}
//                 imageStyle="coh_small_square"
//               />
//             </div>
//           )}
//           <div className="p-6 lg:px-12 lg:pb-20">
//             <h2
//               className="mb-3 font-body text-lg font-bold leading-6 text-secondary-900 line-clamp-3 lg:text-xl">{node.title}</h2>
//             {node.body?.summary && (
//               <p className="font-body text-sm leading-5 text-black-900 line-clamp-3 lg:leading-8 lg:text-[16px]"
//                  data-cy="summary">
//                 {node.body.summary}
//               </p>
//             )}
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }




