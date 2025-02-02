import { ReactNode } from 'react';
import styles from './styles.module.scss';

const UserName = ({children}: {children: ReactNode}) => {
  return (
    <div className={styles["user-name"]}>
      {children}
    </div>
  )
}

export default UserName;
