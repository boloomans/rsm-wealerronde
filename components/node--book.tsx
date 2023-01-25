import Link from "next/link"
import { MediaImage } from "components/media--image"
import {FormattedText} from "./formatted-text";

export function NodeBook({ node }) {
  return (
    <article
      key={node.id}
      className="mx-auto grid max-w-xl grid-cols-3 gap-10 py-12"
    >
      {node.field_book_image && (
        <div className="my-6 overflow-hidden rounded-md">
          <MediaImage media={node.field_book_image} priority />
        </div>
      )}
      <div className="col-span-2 flex flex-col space-y-4">
        <h1 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
          {node.title}
        </h1>
        <p className="mb-4">
          {node.field_display_author?.title ? (
            <span>
            <span className="font-semibold">
              {node.field_display_author?.title}
            </span>
          </span>
          ) : null}
        </p>
        {node.body?.processed && (
          <div className="prose dark:prose-invert">
            <FormattedText processed={node.body.processed} />
          </div>
        )}
      </div>
    </article>
  )
}

export function NodeBookTeaser({ node }) {

  return (
    <article className="grid max-w-xl grid-cols-3 gap-10 py-4">
      {node.field_book_image && (
        <Link className="block overflow-hidden rounded-md no-underline" href={node.path.alias} passHref>
          <MediaImage media={node.field_book_image} priority />
        </Link>
      )}
      <div className="col-span-2">
        <p className="text-gray-500 mb-4 text-sm">
          {node.field_display_author?.title ? (
            <span>
              <span className="font-semibold">
                {node.field_display_author?.title}
              </span>
            </span>
          ) : null}
        </p>
        <Link className="no-underline" href={node.path.alias} passHref>
            <h2 className="mb-4 text-xl font-bold">{node.title}</h2>
        </Link>
        {node.body && (
          <div
            className="text-xs"
            dangerouslySetInnerHTML={ { __html: node.body.processed } }
          />
        )}
      </div>
    </article>
  )
}
