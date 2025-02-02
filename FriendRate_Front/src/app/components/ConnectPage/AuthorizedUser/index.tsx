'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import picture from '../../../images/microfon.svg';
import Stroke from '../Stroke';
import Circle from '../Circle';
import Rate from '../Rate';
import UserName from '../UserName';
import AvatarImage from '../AvatarImage';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { useSelector } from 'react-redux';
import { usersNames } from '@/app/REDUX/Users/selectors';


export interface OpositUser{
    userName: string,
    avatarURL: string,
    rate: number,
    ratingCount: number
}
const AuthorizedUser = (
  {
    isConnected,
    spinner,
    search,
    call,
    lng,
  }: {
    isConnected: boolean,
    spinner: boolean,
    search: boolean,
    call: boolean,
    lng: any,
  }) => {

    const { user, unrUser} = useAuth(); 
    const usersInRoom = useSelector(usersNames)


    const [opositUser, setOpositUser] = useState<OpositUser | null>(null);

    useEffect(() => {
      if (Array.isArray(usersInRoom)) {
        const foundUser = usersInRoom.find(
          (u: OpositUser) => u.userName !== (user?.username || unrUser?.username)
        );
        setOpositUser(foundUser || null);
      }
    }, [usersInRoom, user, unrUser]);


  return (
    <div className={spinner ? styles.authorized : styles['authorized-call']}>
      <div className={styles["authorized__content"]}>
        <Stroke spinner={spinner}>
          <Circle  lng={lng} call={call} isConnected={isConnected}>
            <AvatarImage search={search} src={opositUser && opositUser.avatarURL ? opositUser.avatarURL : picture} isConnected={isConnected}/>

            <Rate rate={opositUser?.rate} ratingCount={opositUser?.ratingCount}></Rate>
            <UserName>{!search && opositUser?.userName}</UserName>
          </Circle>
        </Stroke>
      </div>
    </div>
  )
}

export default AuthorizedUser;
