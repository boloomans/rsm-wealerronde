import React from "react";
import { GetStaticPropsResult } from 'next';
import { Layout, LayoutProps } from 'components/layout';
import { getMenus } from 'lib/get-menus';
import { DrupalNode } from 'next-drupal';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { drupal } from '../lib/drupal';
import { testApiCompatibility } from 'next-acms';
import { NodeCard } from '../components/Components/card';
import { BlockWheel } from '../components/block--wheelNavigation';
import { ENTITY_TYPES } from './[...slug]';

interface ProgrammaPageProps extends LayoutProps {
  events: DrupalNode[];
}

export default function programmaPage({ menus, events  }: ProgrammaPageProps) {
  return (
    <Layout title="Informatie" menus={menus}>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">
            <div className="container mx-auto mt-12 pb-10">
              {events?.length ? (
                <div className="grid gap-4 lg:gap-14" data-cy="featured-news">
                  <div className="grid grid-cols-1 gap-2">
                    {events.slice(0, 1).map((event) => (
                      <NodeCard
                        key={event.id}
                        node={event}
                        className="bg-primary-10 text-primary-900"
                        time={true}
                        linkInside
                      />
                    ))}
                  </div>
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
  const events = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--event',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('field_event_start', 'ASC')
        .addFilter('field_event_start', new Date().toISOString(), '>=')
        .addInclude(['field_event_image.image', 'field_event_place'])
        .addFields('node--event', [
          'id',
          'title',
          'path',
          'body',
          'field_event_start',
          'field_event_image',
          'field_event_place',
          'field_inline_link',
        ])
        .addFields('node--place', ['title', 'path'])
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      events,
    },
    revalidate: 60,
  };
}
