import { MouseEventHandler } from 'react';
import styles from './styles.module.scss';

const Button = ({ children, onClick }: {
  children: React.ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}) => {
  return (
    <button onClick={onClick} className={styles.button}>{children}</button>
  )
}

export default Button;
