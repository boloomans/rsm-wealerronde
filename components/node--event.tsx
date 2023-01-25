import Link from 'next/link';

import { formatDate } from 'lib/format-date';
import { MediaImage } from 'components/media--image';
import { FormattedText } from 'components/formatted-text';

export function NodeEvent({ node, ...props }) {
  return (
    <article className="container mx-auto px-6 py-10" {...props}>
      <div className="mx-auto grid-cols-2 gap-10 rounded-md border p-4 md:grid">
        {node.field_event_image && (
          <Link className="block overflow-hidden rounded-md no-underline" href={node.path.alias} passHref>
            <MediaImage
              media={node.field_event_image}
              priority
              sizes="(min-width: 968px) 410px, (min-width: 768px) 50vw, 100vw"
              imageStyle="coh_medium"
            />
          </Link>
        )}
        <div className="mt-8">
          <div className="mb-2 space-x-2 text-sm">
            {node.field_event_duration && (
              <span className="font-medium">
                {formatDate(node.field_event_start)}
              </span>
            )}
            {node.field_event_duration && (
              <span className="text-gray-500">
                &middot; {node.field_event_duration}
              </span>
            )}
            {node.field_event_place && (
              <span className="text-gray-500">
                &middot; {node.field_event_place.title}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold">{node.title}</h1>
          {node.body?.summary && (
            <p className="text-gray-500 text-sm">{node.body.summary}</p>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-10 ">
        {node.body?.processed && (
          <div className="prose">
            <FormattedText processed={node.body.processed} />
          </div>
        )}
      </div>
    </article>
  );
}

export function NodeEventTeaser({ node, ...props }) {
  return (
    <article
      className="mx-auto items-start gap-10 space-y-4 rounded-md border p-4 md:grid md:grid-cols-3 md:space-y-0"
      {...props}
    >
      {node.field_event_image && (
        <Link className="block overflow-hidden rounded-md no-underline" href={node.path.alias} passHref>
            <MediaImage
              media={node.field_event_image}
              priority
              sizes="(min-width: 768px) 140px, 100wh"
            />
        </Link>
      )}
      <div className="col-span-2">
        <div className="mb-2 space-x-2 text-sm">
          {node.field_event_start && (
            <span className="dark:text-gray-400 font-medium">
              {formatDate(node.field_event_start)}
            </span>
          )}
          {node.field_event_duration && (
            <span className="text-gray-500">
              &middot; {node.field_event_duration}
            </span>
          )}
          {node.field_event_place && (
            <span className="text-gray-500">
              &middot; {node.field_event_place.title}
            </span>
          )}
        </div>
        <Link className="dark:hover:no-underline" href={node.path.alias} passHref>
          <h2 className="mb-4 text-3xl font-bold">{node.title}</h2>
        </Link>
        {node.body?.summary && (
          <p className="text-gray-500 text-sm">{node.body.summary}</p>
        )}
      </div>
    </article>
  );
}
