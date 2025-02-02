'use client';
import Link from "next/link";
import BlockLogo from "../components/HelloPage/BlockLogo";
import BlockTitle from "../components/HelloPage/BlockTitle";
import Button from "../components/HelloPage/Button";
import ButtonIn from "../components/HelloPage/ButtonIn";
import Description from "../components/HelloPage/Description";
import Container from "../components/Container";
import HelloImage from "../components/HelloPage/HelloImage";
import LogoImage from "../components/HelloPage/LogoImage";
import Title from "../components/HelloPage/Title";
import styles from './styles.module.scss';
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import BlockButton from "../components/HelloPage/BlockButton";
import Block from "../components/SignIn/Block";
import { useTranslation } from '../../i18n/client';
import { Dispatch } from "../REDUX/store";
import { useDispatch } from "react-redux";
import OurTeam from "../components/OurTeamModal/OurTeam";
import ConectionModal from "./SignInContainer/ConectionModal/ConectionModal";


const HelloPage = ({ params }) => {
  const router = useRouter();
  const { t } = useTranslation(params, 'hello-page');

  const dispatch:Dispatch = useDispatch();
  const [open, setOpen] = useState(false);
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => setOpen(false);



  return (
    <Block className={styles.main}>
      <Container>
        <Block className={styles.content}>
          <BlockLogo>
          <HelloImage></HelloImage>
          <LogoImage></LogoImage>
          </BlockLogo>
          <BlockTitle>
          <Title>{t('title')} <br /> {t('titleWith')}</Title>
          <Description>
            {t('description')}
            <br />
            {t('descriptionWith')}
          </Description>
          </BlockTitle>
          <BlockButton>
          <Button onClick={() => router.push('/signup')}>{t('signUp')}</Button>
          <ButtonIn onClick={() => router.push('/sign-in')}>{t('signIn')}</ButtonIn>
          </BlockButton>
          <Link onClick={handleOpen} href={""} className={styles['none-registration']}>{t('regist')}</Link>
          <ConectionModal handleOpen={open} handleClose={handleClose} params={params}/>
          <span className={styles.footerDevelopers} onClick={openModal} style={{ backgroundColor: 'transparent' }}>
          The web application was created by the Junfolio team 2024 © All rights reserved
            </span>
           <OurTeam onClose={closeModal} openModal={isModalOpen}/>
        </Block>
      </Container>
    </Block>
  )
}

export default HelloPage;