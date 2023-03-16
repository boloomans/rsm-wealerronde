import classNames from 'classnames';
import { Button } from '../../ThemeConfig';
import { BiChevronRight } from 'react-icons/bi';
import React from 'react';

export function CardButton({small = false}) {
  return (
    <div className={classNames('flex justify-end -mt-12 mr-4 -bottom-6', {'relative justify-end': !small}, {'absolute justify-center lg:justify-end left-0 right-0 -mt-6 mr-0 lg:mr-4': small})}>
      <Button className='rounded-full bg-secondary-900'>
        <BiChevronRight className="text-5xl text-white-900"></BiChevronRight>
      </Button>
    </div>
  )
}
