import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { DrupalMenuLinkContent } from 'next-drupal';
import DarkModeToggle from "./DarkModeToggle";
import React, {HTMLAttributes} from "react";

interface MenuMainProps {
  menu?: DrupalMenuLinkContent[];
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export function MenuMain({ menu, className, ...props }: MenuMainProps) {
  const router = useRouter();

  if (!menu?.length) {
    return null;
  }

  return (
    <nav className={classNames('hidden lg:block', className)} data-cy="nav-menu" {...props}>
      <ul className="flex items-center space-x-4 md:space-x-8">
        {menu?.map((item) => {
          const isActive =
            router.asPath === item.url ||
            (item.url !== '/' ? router.asPath.indexOf(item.url) === 0 : false);

          return (
            <li
              key={item.id}
              className={classNames('menu-item', {
                'menu-item--active-trail': isActive,
              })}
            >
              <Link href={item.url} passHref>
                <a
                  className={classNames('hover:text-blue-600', {
                    'text-blue-600': isActive,
                  })}
                >
                  {item.title}
                </a>
              </Link>
            </li>
          );
        })}
        <li className="menu-item">
          <DarkModeToggle></DarkModeToggle>
        </li>
      </ul>
    </nav>
  );
}
