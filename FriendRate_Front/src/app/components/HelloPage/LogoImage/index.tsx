import microphone from '../../../images/hello-page/microphone.svg';
import logoText from '../../../images/hello-page/friend-rate.svg';
import Image from 'next/image';
import styles from './styles.module.scss';

const LogoImage = () => {
  return (
    <div className={styles.logo}>
      <Image
        src={microphone}
        width={32}
        height={40}
        quality={100}
        alt='logo'
      />

      <Image
        src={logoText}
        width={172}
        height={28}
        quality={100}
        alt='logo'
      />
    </div>
  )
}

export default LogoImage;
