import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

const UserName = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className={styles['user-name']}>{children}</h2>
  )
}

export default UserName;