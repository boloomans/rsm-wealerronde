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
import { BlockHero } from '../components/block--hero';


interface IndexPageProps extends LayoutProps {
  person: DrupalNode[];
}

export default function IndexPage({ menus, person }: IndexPageProps) {
  console.log(person);
  return (
    <Layout title="Informatie" menus={menus}>
      <BlockHero heading={"Ben jij klaar voor de start?"}></BlockHero>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">

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
  const person = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--person',
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
          'path',
          'body',
          'field_news_date',
          'field_news_image'
        ])
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      person,
    },
    revalidate: 60,
  };
}
