"use client"
import React from 'react';
import styles from './NotFound.module.scss';
import Container from '../components/Container';
import Image from 'next/image';
import NotFoundImg from '../images/NotFound/404 page.png';
import { useRouter } from "next/navigation";
import { useTranslation } from '../../i18n/client';


export default function NotFound({ params }) {
  const router = useRouter();
  const { t } = useTranslation(params, 'error');

  return (
    <>
    <Container>
      <div className={styles.imgBlock}>
        <Image
          src={NotFoundImg}
          width={349}
          height={253}
          quality={100}
          priority={true}
          alt='Not found - Illustration of a missing page'
        />
        <p className={styles.notFoundPageTxt}>
          {t("title")}
        </p>
      </div>
      <button onClick={() => router.push(`/${params}`)} className={styles.notFoundBtn}>
        {t('home')}
      </button>
    </Container>
  </>

    
  )
}
