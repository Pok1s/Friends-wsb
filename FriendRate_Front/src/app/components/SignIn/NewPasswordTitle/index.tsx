import TitleSignIn from '../TitleSignIn';
import { useTranslation } from '@/i18n/client';

const NewPasswordTitle = ({ lng, styles }) => {
  const { t } = useTranslation(lng, 'new-password');

  return (
    <TitleSignIn className={styles.head}>
      {t('title')}
    </TitleSignIn>
  )
}

export default NewPasswordTitle;
