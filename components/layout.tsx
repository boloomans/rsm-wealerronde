import Link from 'next/link';
import Image from "next/legacy/image";
import Head from 'next/head';
import { DrupalMenuLinkContent } from 'next-drupal';

import { PreviewAlert } from 'components/preview-alert';
import { MenuMain } from 'components/menu--main';
import { MenuFooter } from 'components/menu--footer';
import React, {useEffect, useRef, useState} from "react";
import {FaBell} from "react-icons/fa";
import {BlockHero} from "./block--hero";

export interface LayoutProps {
  title?: string;
  children?: React.ReactNode;
  menus: {
    main: DrupalMenuLinkContent[];
    footer: DrupalMenuLinkContent[];
  };
  banners?,
}

export function Layout({ title, menus, banners, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} - RSM Wealerronde</title>
      </Head>
      <PreviewAlert />
      <div className="flex flex-col relative" >
        <header className={`w-full z-50 navbar sticky-custom`}>
          <div className="container flex flex-row items-center justify-between px-6 py-4 mx-auto">
            <Link className="flex items-center space-x-2 no-underline" href="/" passHref>
              <div className="">
                <Image src="/logo.png" alt="Logo" width={83} height={33} />
              </div>
            </Link>
            <FaBell className="text-primary-900 text-2xl"></FaBell>
            {menus?.main && <MenuMain menu={menus.main} />}
          </div>
        </header>
        <main className="flex-1">
          <BlockHero heading={"Ben jij klaar voor de start?"} banner={banners}></BlockHero>
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
