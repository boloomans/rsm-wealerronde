import { GetStaticPropsResult } from 'next';
import { Layout, LayoutProps } from 'components/layout';
import { getMenus } from 'lib/get-menus';
import { DrupalBlock, DrupalFile, DrupalMedia, DrupalNode } from 'next-drupal';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { drupal } from '../lib/drupal';
import { testApiCompatibility } from 'next-acms';
import { ENTITY_TYPES } from './[...slug]';
import React from "react";
import { NodePerson} from '../components/node--person';
import { NodeCardBig } from '../components/node--news';
import { BlockBanner } from '../components/block--banner';


interface InfoPageProps extends LayoutProps {
  persons: DrupalNode[];
  news: DrupalNode[];
  banners?: DrupalNode[];
}

export default function IndexPage({ menus, news, persons, banners }: InfoPageProps) {
  console.log(persons);
  return (
    <Layout title="Informatie" menus={menus}>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">
            <div className="container mx-auto mt-12 pb-10">
              {news?.length ? (
                <div className="grid gap-4 lg:gap-14" data-cy="featured-news">
                  {news.slice(0, 1).map((news) => (
                    <NodeCardBig
                      key={news.id}
                      node={news}
                      color="primary"
                    />
                  ))}
                </div>
              ) : (
                <p>Geen resultaten gevonden.</p>
              )}
            </div>


            {persons?.length ? (
              <div className="grid grid-cols-2 gap-4 lg:gap-14" data-cy="featured-persons">
                {persons.slice(0, 1).map((person) => (
                  <NodePerson
                    key={person.id}
                    person={person}
                  />
                ))}
              </div>

            ) : (
              <p>Geen resultaten gevonden.</p>
            )}

            {banners?.field_banner.length ? (
              <div className="container relative mx-auto my-12 flex flex-col px-4 sm:items-center">
                {banners.field_banner.slice(0, 2).map((banner) => (
                  <BlockBanner key={banner.id} banner={banner}/>
                ))}
              </div>
            ) : ''}

          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<InfoPageProps>> {
  if (process.env.NODE_ENV == 'development') {
    await testApiCompatibility(ENTITY_TYPES, drupal);
  }
  const persons = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--person',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('title', 'DESC')
        .addInclude(['field_person_image.image'])
        .addFields('node--person', [
          'id',
          'title',
          'path',
          'body',
          'field_person_image',
          'field_job_title'
        ])
        .getQueryObject(),
    },
  );
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
  const banners = await drupal.getResourceCollectionFromContext<DrupalFile[]>(
    'block--banner',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('title', 'DESC')
        .addFields('block--banner', [
          'id',
          'field_banner',
        ])
        .addPageLimit(1)
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      persons,
      news,
      banners,
    },
    revalidate: 60,
  };
}
