import { GetStaticPropsResult } from 'next';
import { Layout, LayoutProps } from 'components/layout';
import { getMenus } from 'lib/get-menus';
import {DrupalBlock, DrupalNode} from 'next-drupal';
import { NodeEventTeaser } from '../components/node--event';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import Image from "next/legacy/image";
import Link from 'next/link';
import { drupal } from '../lib/drupal';
import { testApiCompatibility } from 'next-acms';
import { ENTITY_TYPES } from './[...slug]';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

interface IndexPageProps extends LayoutProps {
  events: DrupalNode[];
  places: DrupalNode[];
  banners: DrupalBlock[];
}

export default function IndexPage({ menus, events, banners, places }: IndexPageProps) {
  return (
    <Layout title="Home" menus={menus} banners={banners}>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">
            <Tabs>
              <TabList>
                <Tab>Nieuws</Tab>
                <Tab>Fotoboek</Tab>
                <Tab>Liveblog</Tab>
              </TabList>

              <TabPanel>
                <div className="container px-6 pb-10 mx-auto mt-12">
                  <h2 className="text-md mb-2 lg:text-2xl text-gray-600 dark:text-gray-400">
                    Featured Events
                  </h2>
                  {events?.length ? (
                    <div className="grid gap-14" data-cy="featured-events">
                      {events.slice(0, 3).map((event) => (
                        <NodeEventTeaser key={event.id} node={event} />
                      ))}
                    </div>
                  ) : (
                    <p>No content found.</p>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="container px-6 pb-10 mx-auto mt-12">
                  <h2 className="text-md mb-2 lg:text-2xl text-gray-600 dark:text-gray-400">
                    Featured Events
                  </h2>
                  {events?.length ? (
                    <div className="grid gap-14" data-cy="featured-events">
                      {events.slice(0, 3).map((event) => (
                        <NodeEventTeaser key={event.id} node={event} />
                      ))}
                    </div>
                  ) : (
                    <p>No content found.</p>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="container px-6 pb-10 mx-auto mt-12 text-center items-center">
                  <h2 className="text-md mb-2 lg:text-2xl text-gray-600">Contact Us</h2>
                  {places?.length ? (
                    <div className="grid gap-14" data-cy="contact-us">
                      {places.slice(0, 3).map((place) => (
                        <article key={place.id}>
                          <Link href={place.path.alias} passHref>
                            <a className="no-underline hover:text-blue-600">
                              <h2 className="text-3xl font-bold">{place.title}</h2>
                            </a>
                          </Link>
                          <p className="text-lg text-gray-600">
                            {place.field_place_telephone}
                          </p>
                          <p className="text-lg text-gray-600">
                            {place.field_place_address.address_line1}
                          </p>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p>No content found.</p>
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<IndexPageProps>> {
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
          'field_event_start',
          'field_event_image',
          'field_event_place',
        ])
        .addFields('node--place', ['title', 'path'])
        .getQueryObject(),
    },
  );
  const places = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--place',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('title', 'ASC')
        .addFields('node--place', [
          'id',
          'title',
          'path',
          'field_place_address',
          'field_place_telephone',
        ])
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      events,
      places,
    },
    revalidate: 60,
  };
}
