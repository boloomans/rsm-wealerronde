import { GetStaticPropsResult } from 'next';
import { DrupalNode } from 'next-drupal';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

import { getMenus } from 'lib/get-menus';
import { Layout, LayoutProps } from 'components/layout';
import { PageHeader } from 'components/page-header';
import { NodeCardSmall } from 'components/node--news';
import { drupal } from '../lib/drupal';

interface ArticlesPageProps extends LayoutProps {
  articles: DrupalNode[];
}

export default function ArticlePage({ menus, articles }: ArticlesPageProps) {
  return (
    <Layout title="Articles" menus={menus}>
      <PageHeader heading="Articles" text="List of latest articles." />
      <div className="container mx-auto px-6 pb-10">
        {articles?.length ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-12 md:gap-x-4">
            {articles.map((article) => (
              <NodeCardSmall key={article.id} node={article} />
            ))}
          </div>
        ) : (
          <p>No content found.</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<ArticlesPageProps>> {
  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--article',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('created', 'DESC')
        .addInclude(['field_article_image.image', 'field_display_author'])
        .addFields('node--article', [
          'id',
          'title',
          'body',
          'path',
          'created',
          'field_display_author',
          'field_article_image',
        ])
        .getQueryObject(),
    },
  );

  return {
    props: {
      articles,
      menus: await getMenus(context),
    },
    revalidate: 60,
  };
}
