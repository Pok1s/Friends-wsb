import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

const Message = ({children}: {children: ReactNode}) => {
  return (
    <p className={styles.message}>{children}</p>
  )
}

export default Message;