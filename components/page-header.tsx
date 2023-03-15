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
        </div>
    );
}
