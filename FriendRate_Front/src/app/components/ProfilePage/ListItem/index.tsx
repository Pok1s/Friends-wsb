import { ReactNode } from 'react';
import styles from './styles.module.scss';

const ListItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className={styles['list-item']}>{children}</li>
  )
}

export default ListItem;