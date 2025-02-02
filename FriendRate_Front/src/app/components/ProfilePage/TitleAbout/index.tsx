import { ReactNode } from 'react';
import styles from './styles.module.scss';

const TitleAbout = ({ children }: { children: ReactNode }) => {
  return (
    <h5 className={styles.about}>{children}</h5>
  )
}

export default TitleAbout;