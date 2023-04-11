import { GetStaticPropsResult } from 'next';
import { Layout, LayoutProps } from 'components/layout';
import { getMenus } from 'lib/get-menus';
import { DrupalBlock, DrupalFile, DrupalMedia, DrupalNode } from 'next-drupal';

import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import Link from 'next/link';
import { drupal } from '../lib/drupal';
import { testApiCompatibility } from 'next-acms';
import { ENTITY_TYPES } from './[...slug]';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { NodeCardBig, NodeCardSmall } from "../components/node--news";
import { BlockHero } from "../components/block--hero";
import React from "react";
import { MediaFotobookTeaser } from "../components/media--fotobook";
import { PageHeader } from '../components/page-header';
import { NodeSponsorTeaser } from '../components/node--sponsors';
import { NodePopup } from '../components/node--popup';
import { NodeCard } from '../components/Components/card';

interface IndexPageProps extends LayoutProps {
  news: DrupalNode[];
  events: DrupalNode[];
  places: DrupalNode[];
  banners?: DrupalNode[];
  fotoBooks?: DrupalFile[];
  sponsors?: DrupalNode[];
}

export default function IndexPage({ menus, news, events, banners, fotoBooks, places, sponsors }: IndexPageProps) {
  return (
    <Layout title="Home" menus={menus}>
      <BlockHero heading={"Ben jij klaar voor de start?"}></BlockHero>
      <div className="mt-10 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">
            <Tabs>
              <TabList>
                <Tab>Nieuws</Tab>
                <Tab>Fotoboek</Tab>
                <Tab>Liveblog</Tab>
              </TabList>

              <TabPanel>
                {/*<NodePopup/>*/}

                <div className="container mx-auto mt-12 pb-10">
                  {news?.length ? (
                    <div className="grid gap-4 lg:gap-14" data-cy="featured-news">
                      {news.slice(0, 1).map((news) => (
                        <NodeCard
                          key={news.id}
                          node={news}
                          className="bg-secondary-10 text-secondary-900"
                          large
                          button
                        />
                      ))}
                      <div className="grid grid-cols-2 gap-2 lg:gap-6">
                        {news.slice(1, 3).map((news) => (
                          <NodeCard
                            key={news.id}
                            node={news}
                            className="bg-secondary-10 text-secondary-900"
                            small
                            button
                          />
                        ))}
                      </div>
                    </div>

                  ) : (
                    <p>Geen resultaten gevonden.</p>
                  )}
                </div>

                <div>
                  <PageHeader heading="Onze Sponsoren" text="List of latest articles."
                              className="text-blue-900"/>
                </div>

                <div className="container mx-auto pb-10">
                  {sponsors?.length ? (
                    <div className="">
                      <NodeSponsorTeaser
                        sponsors={sponsors}/>
                    </div>
                  ) : (
                    <p>Geen resultaten gevonden.</p>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="container mx-auto min-h-[400px] pb-10">
                  {fotoBooks?.length ? (
                    <div className="mt-12 grid grid-cols-2 gap-2" data-cy="featured-fotoBooks">
                      {fotoBooks.slice(0, 3).map((fotoBook) => (
                        <MediaFotobookTeaser key={fotoBook.id} media={fotoBook}/>
                      ))}
                    </div>
                  ) : (
                    <p>No content found.</p>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="container mx-auto mt-12 items-center px-6 pb-10 text-center">
                  <h2 className="mb-2 lg:text-2xl">Contact Us</h2>
                  {places?.length ? (
                    <div className="grid gap-14" data-cy="contact-us">
                      {places.slice(0, 3).map((place) => (
                        <article key={place.id}>
                          <Link
                            href={place.path.alias}
                            passHref
                            className="no-underline">
                            <h2 className="text-3xl font-bold">{place.title}</h2>
                          </Link>
                          <p className="text-lg">
                            {place.field_place_telephone}
                          </p>
                          <p className="text-lg">
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
  const fotoBooks = await drupal.getResourceCollectionFromContext<DrupalFile[]>(
    'media--fotoboek',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addInclude(['field_media_image'])
        .addFields('media--fotoboek', [
          'id',
          'path',
          'name',
          'field_title',
          'field_description',
          'field_media_image',
        ])
        .addPageLimit(4)
        .getQueryObject(),
    },
  );
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
        .addInclude(['field_place_image.image'])
        .addFields('node--place', [
          'id',
          'title',
          'path',
          'field_place_address',
          'field_place_telephone',
          'field_place_image',
        ])
        .getQueryObject(),
    },
  );
  const sponsors = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--sponsoren',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('sticky', 'DESC')
        .addSort('title', 'DESC')
        .addInclude(['field_logo.image'])
        .addFields('node--sponsoren', [
          'id',
          'title',
          'field_description',
          'field_logo',
          'field_website_link',
        ])
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      news,
      events,
      places,
      fotoBooks,
      sponsors,
    },
    revalidate: 60,
  };
}
