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
      <div className="relative flex min-h-screen flex-col">
        <header className={`navbar sticky-custom z-50 w-full`}>
          <div className="container mx-auto flex flex-row items-center justify-between px-6 py-4">
            <Link className="flex items-center space-x-2 no-underline" href="/" passHref>
              <div className="">
                <Image src="/logo.png" alt="Logo" width={83} height={33} />
              </div>
            </Link>
            <FaBell className="text-2xl text-primary-900"></FaBell>
            {menus?.main && <MenuMain menu={menus.main} />}
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="container mx-auto px-6">
          <div className="border-t pt-8 pb-12 md:pt-12">
            {menus?.footer && <MenuFooter menu={menus.footer} />}
          </div>
        </footer>
      </div>
    </>
  );
}
