'use client';
import React, { FC } from 'react';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import Block from '../Block';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import { UseTranslationResponse } from 'react-i18next';

type Props = {
  setModalIcon: (value: boolean) => void,
  useTranslation: (lng: string, ns: string, obj?: any) => UseTranslationResponse<string, undefined>,
  lng: any,
  router: AppRouterInstance,
}

const CheckEmail: FC<Props> = ({ setModalIcon, router, useTranslation, lng }) => {
  const { t } = useTranslation(lng, 'check-email');

  return (
    <Block className={styles.check} onClick={() => setModalIcon(false)}>
      <Block className={styles['check__content']}>
        <Block className={styles['check__desc']}>
          {t('title')}
        </Block>
        <ButtonSubmit
          className={styles.signupBtn}
          type={TypeButton.BUTTON}
          disabled={false}

        >
          {t('button')}
        </ButtonSubmit>
      </Block>
    </Block>
  )
}

export default CheckEmail;
