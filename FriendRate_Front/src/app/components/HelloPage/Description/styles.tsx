import styles from './styles.module.scss';

const Description = ({children}: { children: React.ReactNode }) => {
  return (
    <p className={styles.description}>{children}</p>
  )
}

export default Description;
