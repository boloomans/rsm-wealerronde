import React from "react";
import { GetStaticPropsResult } from 'next';
import { Layout, LayoutProps } from 'components/layout';
import { getMenus } from 'lib/get-menus';
import { DrupalNode } from 'next-drupal';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { drupal } from '../lib/drupal';
import { testApiCompatibility } from 'next-acms';
import { NodeCardBig, NodeCardSmall } from '../components/node--news';
import { BlockWheel } from '../components/block--wheelNavigation';
import { ENTITY_TYPES } from './[...slug]';

interface ProgrammaPageProps extends LayoutProps {
  news: DrupalNode[];
}

export default function IndexPage({ menus, news  }: ProgrammaPageProps) {
  return (
    <Layout title="Informatie" menus={menus}>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">
            <div className="container mx-auto mt-12 pb-10">
              <h1>Programma</h1>

              {news?.length ? (
                <div className="grid gap-4 lg:gap-14" data-cy="featured-news">
                  <div className="grid grid-cols-1 gap-2">
                    {news.slice(0, 1).map((news) => (
                      <NodeCardSmall
                        key={news.id}
                        node={news}
                        size="small"
                      />
                    ))}
                  </div>
                  <div>19:00</div>
                </div>

              ) : (
                <p>Geen resultaten gevonden.</p>
              )}

              <BlockWheel/>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<ProgrammaPageProps>> {
  if (process.env.NODE_ENV == 'development') {
    await testApiCompatibility(ENTITY_TYPES, drupal);
  }
  const news = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--news',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('field_news_date', 'DESC')
        .addInclude(['field_news_image.image'])
        .addFields('node--news', [
          'id',
          'title',
          'path',
          'body',
          'field_news_date',
          'field_news_image',
        ])
        .addPageLimit(3)
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      news,
    },
    revalidate: 60,
  };
}
