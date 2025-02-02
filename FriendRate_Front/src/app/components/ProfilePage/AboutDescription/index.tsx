import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

const AboutDescription = ({children}: { children: ReactNode }) => {
  return (
    <p className={styles['about__description']}>{children}</p>
  )
}

export default AboutDescription;