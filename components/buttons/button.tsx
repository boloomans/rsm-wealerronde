import classNames from 'classnames';
import { Button } from '../../ThemeConfig';
import { BiChevronRight } from 'react-icons/bi';
import React from 'react';

export function CardButton({small = false}) {
  return (
    <div className={classNames('relative flex justify-end -mt-6 mb-0 mr-4', {'justify-center lg:justify-end lg:-mt-6 lg:mb-0 lg:mr-4': small})}>
      <Button className='rounded-full bg-secondary-900'>
        <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
      </Button>
    </div>
  )
}