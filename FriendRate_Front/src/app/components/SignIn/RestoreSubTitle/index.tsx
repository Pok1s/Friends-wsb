import Block from '../Block';
import { useTranslation } from '@/i18n/client';

const RestoreSubTitle = ({ lng, styles }) => {
  const { t } = useTranslation(lng, 'restorePassword');
  return (
    <Block className={styles['description-restore']}>
      {t('subTitle')}
    </Block>
  )
}

export default RestoreSubTitle;
