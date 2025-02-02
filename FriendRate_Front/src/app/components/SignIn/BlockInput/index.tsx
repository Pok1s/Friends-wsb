import styles from './styles.module.scss';

const BlockInput = (
  { children }:
  { children: React.ReactNode }
) => {
  return (
    <div className={styles['block-input']}>{children}</div>
  )
}

export default BlockInput;