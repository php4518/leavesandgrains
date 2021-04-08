import React from 'react';
import cx from 'classnames';

const List = ({ items, renderItem, children, wrapperClass }) => (
  <div className={cx('zr-list', wrapperClass)}>
    {children || items.map(renderItem)}
  </div>
);

export default List;
