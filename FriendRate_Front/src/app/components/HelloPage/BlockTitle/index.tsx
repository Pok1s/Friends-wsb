import styles from './styles.module.scss';

const BlockTitle = ( {children}: {children: React.ReactNode}) => {
  return (
    <div className={styles['container-title']}>{children}</div>
  )
}

export default BlockTitle;
