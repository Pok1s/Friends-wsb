import styles from './styles.module.scss';

const BlockContent = (
  { children, className }:
  { children: React.ReactNode, className?: string }
) => {
  return (
    <div className={`${styles['block-content']} ${className}`}>{children}</div>
  )
}

export default BlockContent;
