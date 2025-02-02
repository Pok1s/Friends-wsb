import React, { ReactNode, CSSProperties } from 'react';
import styles from './styles.module.scss';

interface ContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Container = ({ children, style }: ContainerProps) => {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};

export default Container;