import React, { ReactElement } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const Stroke = (
  { children, spinner, className }:
  {
    children: ReactElement | ReactElement[],
    spinner?: boolean,
    className?: string,
  }) => {
  return (
    <div className={classNames(className, {
     [styles.stroke]: !spinner,
     [styles["stroke-hidden"]]: spinner,
    //  [styles["stroke-group"]]: !group,
    })
    } >{children}</div>
  )
}

export default Stroke;
