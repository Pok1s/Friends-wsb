'use client';
import Container from '@/app/components/Container';
import Title from '@/app/components/HelloPage/Title';
import Navbar from '@/app/components/NavBar/Navbar';
import List from '@/app/components/ProfilePage/List';
import ListItem from '@/app/components/ProfilePage/ListItem';
import UserName from '@/app/components/ProfilePage/UserName';
import Block from '@/app/components/SignIn/Block';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import logOutImg from '../../images/profile/log-out.svg';
import changeImage from '../../images/profile/change-photo.svg';
import star from '../../images/profile/star-rate.svg';
import styles from './styles.module.scss';
import TitleAbout from '@/app/components/ProfilePage/TitleAbout';
import AboutDescription from '@/app/components/ProfilePage/AboutDescription';
import Label from '@/app/components/SignIn/Label';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/app/REDUX/Auth/selector';
import { Dispatch } from '@/app/REDUX/store';
import { logOut, updateImageProfile } from '@/app/REDUX/Auth/operations';
import { useTranslation } from '@/i18n/client';




const calculateAge = (birthDate: string | undefined) => {
  if (!birthDate) return 0;

  const birthDateParts = birthDate.split('.');
  if (birthDateParts.length !== 3) return 0;

  const birthDateUser = new Date(birthDateParts.reverse().join('-'));

  if (isNaN(birthDateUser.getTime())) return 0;

  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDateUser.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDateUser.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateUser.getDate())) {
    age--;
  }

  return age;
};

const ProfileContainer = ({ lng }) => {


  const privacyPolicyLink = lng === 'en' ? 'https://drive.google.com/file/d/1gr0CSGZOeOBMfdGxqFnaM2wf4fKSd5K_/view?usp=sharing' : 'https://drive.google.com/file/d/1oA9lMEL1HGP00rIt16mAtNiAItX_7oLr/view?usp=drive_link';
  const termsLink = lng === 'en' ? 'https://drive.google.com/file/d/1D9sc5Gq6P6bzzsnk2Nt3ftlRi-JA7TVJ/view?usp=sharing' : 'https://drive.google.com/file/d/1TeUkZGRPACGfmGij4icaf21dmpKj4nJf/view?usp=sharing';

  const { t } = useTranslation(lng, 'profile');



  const userData = useSelector(selectUser);
  const dispatch: Dispatch = useDispatch();
  const avatarUrl = userData?.avatarURL as string;

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (file.size >= 10 * 1024 * 1024
        && !file.type.includes('jpeg')
        && !file.type.includes('jpg')
        && !file.type.includes('svg')
        && !file.type.includes('webp')
        && !file.type.includes('png')
      ) {
        return;
      }

    dispatch(updateImageProfile(file));
  }

  console.log(userData);
  const averageRate = userData?.rate && userData?.ratingCount ? userData?.rate / userData?.ratingCount : 0;
  const roundedRate = Math.round(averageRate * 100) / 100;

  return (
    <Block className='profile'>
      <Container>
        <Block className={styles['profile__content']}>

          <Block className={styles['profile__block-title']}>
            <Title>{t("title")}</Title>
            <div onClick={() => dispatch(logOut())}>
              <Image 
                width={24}
                height={24}
                src={logOutImg}
                alt={'picture log out'}
              />
              </div>
          </Block>

          <Block className={styles['profile__block-edit']}>
            <Block className={styles['profile__block-image']}>
              <Image
                className={styles['profile__block-image']}
                src={avatarUrl as string}
                width='88'
                height='88'
                alt={'User Image'}
                priority={true}
              />
                <Label className={styles['profile__upload']} htmlFor='file'>
                  <Block className={styles['profile__image-change']}>
                      <input
                        className={styles['profile__opacity']}
                        type="file"
                        name="file"
                        id="file"
                        accept='.jpg, .jpeg, .png, .svg, .webp'
                        onChange={handleChangeImage}
                      />
                    <Image
                      className={styles['profile__upload']}
                      width={15.96}
                      height={15.96}
                      src={changeImage}
                      alt={'Change Image'}
                    />
                  </Block>
                </Label>
            </Block>

            <Block className='profile__user-name'>
              <UserName>{userData?.username}</UserName>
              <Block className={styles['profile__block-rate']}>
                <Image width={17} height={16} src={star} alt={'Star'} />
                <Block className={styles['profile__number']}>{roundedRate}</Block>
              </Block>
              <Link className={styles['profile__edit-profile']} href='/profile-edit'>{t("edit")}</Link>
            </Block>
          </Block>

          <Block className={styles['profile__inform']}>
            <List>
              <ListItem>{t("age")}</ListItem>
              <Block className={styles['profile__inform-value']}>{calculateAge(userData?.birthday)}</Block>
            </List>

            <List>
              <ListItem>{t("gender")}</ListItem>
              <Block className={styles['profile__inform-value']}>
              {userData?.gender}
              </Block>
            </List>

            <List>
              <ListItem>{t("lng")}</ListItem>
              <Block className={styles['profile__inform-value']}>{userData?.language}</Block>
            </List>
          </Block>

          <Block className={styles['profile__about']}>
            <TitleAbout>{t("about")}</TitleAbout>
            <AboutDescription>
            {userData?.about}
            </AboutDescription>
          </Block>

          <Block className={styles['profile__feedback']}>
          <Link className={styles['profile__link']} target="_blank" href={privacyPolicyLink}>{t("privacy")}</Link>
          <Link className={styles['profile__link']} target="_blank" href={termsLink}>{t("terms")}</Link>
            <Link className={styles['profile__link']} href='mailto:friendrate23@gmail.com'>{t("feedback")}</Link>
          </Block>
          <Navbar style={{ paddingLeft: 10, paddingRight: 10 }} />
        </Block>
      </Container>
    </Block>
  )
}
export default ProfileContainer;
