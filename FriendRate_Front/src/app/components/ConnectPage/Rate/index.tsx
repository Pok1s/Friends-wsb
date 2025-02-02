
import styles from './styles.module.scss';
import rateStar from '../../../images/profile/star-rate.svg';
import Image from 'next/image';

const Rate = ({ rate, ratingCount }) => {

  console.log(rate);
  console.log(ratingCount);
  
  const averageRate = rate && ratingCount ? rate / ratingCount : 0;
  const roundedRate = Math.round(averageRate * 100) / 100;
  console.log(averageRate);
  console.log(roundedRate);

  return (
    <div className={styles.rate}>{roundedRate || "0.0"}
        <Image className={styles.star} src={rateStar} alt="Star" />
    </div>
  );
}

export default Rate;