import Link from 'next/link';

import { MediaImage } from 'components/media--image';
import { FormattedText } from 'components/formatted-text';

export function NodePerson({ node, ...props }) {
  return (
    <article className="mx-auto max-w-2xl px-6 py-10" {...props}>
      <div className="grid items-center justify-center gap-4 text-center md:grid-cols-2 md:text-left">
        {node.field_person_image && (
          <div className="block h-48 w-48 overflow-hidden rounded-full no-underline">
            <MediaImage
              media={node.field_person_image}
              priority
              sizes="192px"
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{node.title}</h1>
          {node.field_job_title && (
            <p className="text-xl">{node.field_job_title}</p>
          )}
        </div>
      </div>
      {node.body?.processed && (
        <div className="prose py-10">
          <FormattedText processed={node.body.processed} />
        </div>
      )}
    </article>
  );
}

export function NodePersonTeaser({ node, ...props }) {
  return (
    <article
      className="flex flex-col items-center space-y-4 text-center"
      {...props}
    >
      {node.field_person_image && (
        <Link className="block h-32 w-32 overflow-hidden rounded-full no-underline" href={node.path.alias} passHref>
            <MediaImage
              media={node.field_person_image}
              priority
              sizes="128px"
            />
        </Link>
      )}
      <div className="space-y-2">
        <Link className="no-underline" href={node.path.alias} passHref>
          <h2 className="text-xl">{node.title}</h2>
        </Link>
        {node.field_job_title && (
          <p className="text-gray-600">{node.field_job_title}</p>
        )}
      </div>
    </article>
  );
}
