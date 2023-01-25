import { Layout } from "components/layout"
import { PageHeader } from "components/page-header"
import {getResourceCollectionFromContext} from "next-drupal";
import {getMenus} from "../lib/get-menus";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {NodeBookTeaser} from "../components/node--book";

export default function BooksPage({ books, menus }) {
  console.log(books);
  return (
    <Layout title="Books" menus={menus}>
      <PageHeader heading="Books" text="A collection of books." />
      <div className="container mx-auto px-6 pb-10">
        {books?.length ? (
          <div>
            {books.map((book) => (
              <NodeBookTeaser key={book.id} node={book} />
            ))}
          </div>
        ) : (
          <p>No content found.</p>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {

  const books = await getResourceCollectionFromContext("node--book", context, {
    // For the node--book, only fetch the following fields.
    params: new DrupalJsonApiParams()
      .addInclude(["field_book_image.image", "field_display_author"])
      .addFields("node--book", [
        "title",
        "body",
        "path",
        "field_display_author",
        "field_book_image",
      ])
      .getQueryObject(),
  });
  return {
    props: {
      books,
      menus: await getMenus(),
    },
  }
}
