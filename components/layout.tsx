import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { DrupalMenuLinkContent } from 'next-drupal';

import { PreviewAlert } from 'components/preview-alert';
import { MenuMain } from 'components/menu--main';
import { MenuFooter } from 'components/menu--footer';
import React from "react";
import {FaBell} from "react-icons/fa";
import {BlockHero} from "./block--hero";

export interface LayoutProps {
  title?: string;
  children?: React.ReactNode;
  menus: {
    main: DrupalMenuLinkContent[];
    footer: DrupalMenuLinkContent[];
  };
}

export function Layout({ title, menus, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} - RSM Wealerronde</title>
      </Head>
      <PreviewAlert />
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="container flex flex-row items-center justify-between px-6 py-4 mx-auto">
            <Link href="/" passHref>
              <a className="flex items-center space-x-2 no-underline">
                <div className="">
                  <Image src="/logo.png" alt="Logo" width={83} height={33} />
                </div>
              </a>
            </Link>
            <FaBell className="text-primary-900 text-2xl"></FaBell>
            {menus?.main && <MenuMain menu={menus.main} />}
          </div>
        </header>
        <main className="flex-1">
          <BlockHero heading={"Ben jij klaar voor de start?"}></BlockHero>
          {children}
        </main>
        <footer className="container px-6 mx-auto">
          <div className="pt-8 pb-12 border-t md:pt-12">
            {menus?.footer && <MenuFooter menu={menus.footer} />}
          </div>
        </footer>
      </div>
    </>
  );
}
