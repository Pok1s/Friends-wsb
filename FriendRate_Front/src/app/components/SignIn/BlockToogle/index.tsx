// 'use client'
import styles from './styles.module.scss';

const BlockToggle = (
  { children }:
  { children: React.ReactNode }
) => {
  return (
    <div className={styles['block-toggle']}>{children}</div>
  )
}

export default BlockToggle;
