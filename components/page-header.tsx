import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface PageHeaderProps {
  heading: string;
  text?: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export function PageHeader({ heading, text, className }: PageHeaderProps) {
  return (
    <div className={classNames('container px-6 py-8 mx-auto', className)}>
      <div className="flex flex-col space-y-2 pb-4">
        <h1 className="text-5xl font-black leading-tight">{heading}</h1>
        {text && <p className="text-2xl font-light">{text}</p>}
      </div>
    </div>
  );
}
