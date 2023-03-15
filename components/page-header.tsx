import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface PageHeaderProps {
    heading: string;
    text?: string;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}

export function PageHeader({heading, text, className}: PageHeaderProps) {
    return (
        <div className={classNames('container py-6 mx-auto', className)}>
            <div className="flex flex-col space-y-2">
                <h3 className="font-title text-xl font-bold leading-tight lg:text-2xl">{heading}</h3>
            </div>


          <div className={classNames('container px-6 py-8 mx-auto', className)}>
            <div className="flex flex-col space-y-2 pb-4">
              <h1 className="text-5xl font-black leading-tight">{heading}</h1>
              {text && <p className="text-2xl font-light">{text}</p>}
              <h3 className="text-[20px] font-title font-bold leading-tight">{heading}</h3>
            </div>
          </div>
        </div>
    );
}
