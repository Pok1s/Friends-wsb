import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

const List = ({ children }: { children: ReactNode }) => {
  return (
    <ul className={styles.list}>{children}</ul>
  )
}

export default List;