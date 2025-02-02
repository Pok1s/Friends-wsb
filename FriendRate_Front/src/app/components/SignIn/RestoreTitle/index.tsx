import { useTranslation } from '@/i18n/client';
import React from 'react';
import TitleSignIn from '../TitleSignIn';

const RestoreTitle = ({ lng, styles }) => {
  const { t } = useTranslation(lng, 'restorePassword');
  return (
    <TitleSignIn className={styles['head-restore']}>
      {t('titleRestore')}
    </TitleSignIn>
  )
}

export default RestoreTitle