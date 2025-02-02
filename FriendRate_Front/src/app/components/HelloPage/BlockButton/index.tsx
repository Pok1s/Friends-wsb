import { ReactNode } from 'react';
import styles from './styles.module.scss';

const BlockButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles['block-button']}>{children}</div>
  )
}
export default BlockButton;
