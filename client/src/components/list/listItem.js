import React from 'react';
import cx from 'classnames';

const ListItem = ({ children, wrapperClass }) => (
  <div className={cx('zr-list-item d-flex flex-row justify-content-between', wrapperClass)}>
    {children}
  </div>
);

export default ListItem;
