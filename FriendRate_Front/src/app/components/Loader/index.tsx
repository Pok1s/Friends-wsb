import styles from './styles.module.scss';
import Spinner from './Spinner';

const Louder = () => {
  return (
    <div className={styles.loader}>
      <div className={styles["loader__spinner"]}>
        <Spinner />
      </div>
    </div>
  )
}

export default Louder;