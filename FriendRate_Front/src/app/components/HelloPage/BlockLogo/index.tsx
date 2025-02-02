import styles from './styles.module.scss';

const BlockLogo = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles['block-logo']}>{children}</div>
  )
}

export default BlockLogo;
