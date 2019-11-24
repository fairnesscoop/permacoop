import React from 'react';
import {Link} from 'react-router-dom';
import {BreadcrumbItem} from '../models/BreadcrumbItem';

interface IProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<IProps> = ({items}) => {
  return (
    <nav className={'mt-3'}>
      <ol className={'breadcrumb'}>
        <li className={'breadcrumb-item'}>
          <Link to={'/'}>CoopERP</Link>
        </li>

        {items.map((item: BreadcrumbItem, key) => {
          if (item.lastItem) {
            return (
              <li key={key} className={'breadcrumb-item active'}>
                <span className={'active'}>{item.title}</span>
              </li>
            );
          }

          return (
            <li key={key} className={'breadcrumb-item'}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
