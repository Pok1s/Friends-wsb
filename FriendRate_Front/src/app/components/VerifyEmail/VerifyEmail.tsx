"use client"
import styles from './verify.module.scss';
import Container from '../Container';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useTranslation } from '@/i18n/client';
import { RoomContext } from '../Context/RomContext';




const VerifyEmail = ({params}) => {
  const { ws } = useContext(RoomContext);
  const { t } = useTranslation(params, 'verify-email');
  const router = useRouter();
  const [verifiedUsers, setVerifiedUsers] = useState(false);

  useEffect(() => {
    if (ws) {
      ws.on('user_verified', (userData) => {
        setVerifiedUsers((userData));
      });

      return () => {
        ws.off('user_verified');
      };
    }
  }, [ws]);

  if (verifiedUsers) {
    router.push('/information');
  }

  return (
    <Container>
    <h2 className={styles.head}>{t("verifyEmail")}</h2>
    <p className={styles.subHead}>{t("checkEmail")}</p>

    <button className={styles.resentBtn}>{t("resentEmail")}</button>
    <div className={styles.bottomLine}></div>
    </Container>
  )
}

export default VerifyEmail
