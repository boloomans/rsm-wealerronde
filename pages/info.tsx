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
}

export default function IndexPage({ menus, news, persons }: InfoPageProps) {
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
                      className="bg-primary-10 text-primary-900"
                    />
                  ))}
                </div>
              ) : (
                <p>Geen resultaten gevonden.</p>
              )}
            </div>


            {persons?.length ? (
              <div className="grid grid-cols-2 gap-4 pb-6 lg:gap-14" data-cy="featured-persons">
                {persons.slice(0, 4).map((person) => (
                  <NodePerson
                    key={person.id}
                    person={person}
                  />
                ))}
              </div>

            ) : (
              <p>Geen resultaten gevonden.</p>
            )}

           {/*Blockbanner*/}

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
  return {
    props: {
      menus: await getMenus(context),
      persons,
      news,
    },
    revalidate: 60,
  };
}
