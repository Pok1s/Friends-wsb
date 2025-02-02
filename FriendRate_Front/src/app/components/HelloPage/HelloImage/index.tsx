import image from '../../../images/hello-page/happy-place.png';
import Image from 'next/image';
import styles from './styles.module.scss';

const HelloImage = () => {
  return (
    <div className={styles['hello-image']}>
      <Image
        src={image}
        quality={100}
        priority={true}
        alt='Image'
        style={{ objectFit: 'contain', objectPosition: 'center', width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default HelloImage;
