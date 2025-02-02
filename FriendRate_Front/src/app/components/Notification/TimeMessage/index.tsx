import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

const TimeMessage = ({ children }: { children: ReactNode }) => {
  return (
    <p className={styles['time-message']}>{children}</p>
  )
}

export default TimeMessage;