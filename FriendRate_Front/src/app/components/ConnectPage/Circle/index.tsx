import React, { ReactElement } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const Circle = ({
  children,
  isConnected,
  search,
  call,
  lng,
}: {
  children: ReactElement | ReactElement[],
  isConnected?: boolean,
  search?: boolean,
  call: boolean,
  lng: any,
}) => {
  return (
    <div className={classNames(styles['circle'], {
      [styles['circle-connected']]: isConnected && !search && !call,
      [styles['circle-call']]: call && !isConnected && !search,
      // [styles['circle-group']]: group && !call && !search && !isConnected,
      [styles['circle-notAuth']]: call ,
    })}>{children}</div>
  )
}

export default Circle;