import Link from 'next/link';

import { formatDate } from 'lib/format-date';
import { MediaImage } from 'components/media--image';
import { FormattedText } from 'components/formatted-text';
import { Button } from '../ThemeConfig';
import { BiChevronRight } from 'react-icons/bi';


export function NodeArticle({ node, ...props }) {
  return (
    <article className="max-w-2xl px-6 py-10 mx-auto" {...props}>
      <h1 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
        {node.title}
      </h1>
      <p className="mb-4 text-gray-600">
        {node.field_display_author?.title ? (
          <span>
            Posted by{' '}
            <span className="font-semibold">
              {node.field_display_author?.title}
            </span>
          </span>
        ) : null}
        {node.created && <span> on {formatDate(node.created)}</span>}
      </p>
      {node.field_article_image && (
        <div className="my-6 overflow-hidden rounded-md">
          <MediaImage
            media={node.field_article_image}
            priority
            sizes="(min-width: 768px) 625px, 100vw"
          />
        </div>
      )}
      {node.field_article_media?.length ? (
        <div className="mb-6">
          {node.field_article_media.map((media) => (
            <div key={media.id} className="overflow-hidden rounded-md">
              <MediaImage
                media={media}
                priority
                sizes="(min-width: 768px) 625px, 100vw"
              />
            </div>
          ))}
        </div>
      ) : null}
      {node.body?.processed && (
        <div className="prose">
          <FormattedText processed={node.body.processed} />
        </div>
      )}
    </article>
  );
}

export function NodeArticleTeaser({ node, ...props }) {
    console.log(node);
  return (
    <article className="flex flex-col space-y-4 bg-secondary-10 rounded-lg" {...props}>
      {node.field_article_image && (
        <Link className="block overflow-hidden no-underline rounded-t-lg" href={node.path.alias} passHref>
            <MediaImage
              media={node.field_article_image}
              priority
              sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
            />
        </Link>
      )}
      <div className="m-10">
        <Link className="no-underline text-secondary-900" href={node.path.alias} passHref>
            <h2 className="mb-4 text-lg font-bold">{node.title}</h2>
        </Link>
        {node.body?.summary && (
          <p className="text-sm break-keep text-black-900" data-cy="summary">
            {node.body.summary}
          </p>
        )}
      </div>
      <div>
        <Link href={node.path.alias} passHref>
          <Button className="bg-secondary-900 rounded-full" as="a">
              <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
          </Button>
        </Link>
      </div>
    </article>
  );
}
