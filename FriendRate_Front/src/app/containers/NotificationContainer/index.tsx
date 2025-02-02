'use client';
import React from 'react';
import Title from '@/app/components/HelloPage/Title';
import Navbar from '@/app/components/NavBar/Navbar';
import Block from '@/app/components/SignIn/Block';
import styles from './styles.module.scss';
import Image from 'next/image';
import Message from '@/app/components/Notification/Message';
import TimeMessage from '@/app/components/Notification/TimeMessage';
import userAvatar from '../../images/notification/user-avatar.png';
import iconSpeacer from '../../images/notification/icon-speaker.svg';
import iconGroup from '../../images/notification/icon-group.svg';
import Link from 'next/link';

const NotificationContainer = () => {
  return (
    <Block className={styles['notification']}>
        <Block className={styles['notification__content']}>
          <Block className={styles['notification__padding']}>
            <Title>Notification</Title>
          </Block>

          <Block className={styles['notification__message']}>
            <Image
              className={styles['notification__image']}
              src={userAvatar}
              alt={'User Photo'}
              width={40}
              height={40}
            />
            <Block className={styles['notification__type']}>
              <Message>
                <b
                className={styles['notification__user']}
                >
                  Antonio777
                </b> just rated you
              </Message>
              <TimeMessage>Yesterday at 14:36</TimeMessage>
            </Block>
          </Block>

          <Block className={styles['notification__message']}>
            <Image
              className={styles['notification__image']}
              src={userAvatar}
              alt={'User Photo'}
              width={40}
              height={40}
            />
            <Block className={styles['notification__type']}>
              <Message>
                <b
                className={styles['notification__user']}
                >
                  Antonio777
                </b> just rated you
              </Message>
              <TimeMessage>Yesterday at 14:36</TimeMessage>
            </Block>
          </Block>

          <Block className={styles['notification__message']}>
            <Image
              className={styles['notification__image']}
              src={iconSpeacer}
              alt={'Icon Speacer'}
              width={36}
              height={36}
            />
            <Block className={styles['notification__type']}>
              <Message>
              Your rating changed, your rating is <b
                className={styles['notification__user']}
                >
                  4.5
                </b>
              </Message>
              <TimeMessage>Yesterday at 12:22</TimeMessage>
            </Block>
          </Block>

          <Block className={styles['notification__message-asread']}>
            <Image
              className={styles['notification__image']}
              src={iconGroup}
              alt={'Icon Group'}
              width={36}
              height={36}
            />
            <Block className={styles['notification__type']}>
              <Link className={styles['notification__link']} href={''}>Try communicating in a group stream</Link>
              <TimeMessage>Yesterday at 12:22</TimeMessage>
            </Block>
          </Block>

          <Block className={styles['notification__message-asread']}>
            <Image
              className={styles['notification__image']}
              src={iconSpeacer}
              alt={'Icon Speacer'}
              width={36}
              height={36}
            />
            <Block className={styles['notification__type']}>
              <Message>
              Your rating changed, your rating is <b
                className={styles['notification__user']}
                >
                  4.5
                </b>
              </Message>
              <TimeMessage>Yesterday at 12:22</TimeMessage>
            </Block>
          </Block>

          <Block className={styles['notification__message-asread']}>
            <Image
              className={styles['notification__image']}
              src={iconSpeacer}
              alt={'Icon Speacer'}
              width={36}
              height={36}
            />
            <Block className={styles['notification__type']}>
              <Message>
              Your rating changed, your rating is <b
                className={styles['notification__user']}
                >
                  4.5
                </b>
              </Message>
              <TimeMessage>Yesterday at 12:22</TimeMessage>
            </Block>
          </Block>

          <Block className={styles['notification__message-asread']}>
            <Image
              className={styles['notification__image']}
              src={iconSpeacer}
              alt={'Icon Speacer'}
              width={36}
              height={36}
            />
            <Block className={styles['notification__type']}>
              <Message>
              Your rating changed, your rating is <b
                className={styles['notification__user']}
                >
                  4.5
                </b>
              </Message>
              <TimeMessage>Yesterday at 12:22</TimeMessage>
            </Block>
          </Block>

          <Block className={styles['notification__message-asread']}>
            <Image
              className={styles['notification__image']}
              src={iconSpeacer}
              alt={'Icon Speacer'}
              width={36}
              height={36}
            />
            <Block className={styles['notification__type']}>
              <Message>
              Your rating changed, your rating is <b
                className={styles['notification__user']}
                >
                  4.5
                </b>
              </Message>
              <TimeMessage>Yesterday at 12:22</TimeMessage>
            </Block>
          </Block>
          <Navbar style={{ position: 'fixed' }}/>
        </Block>
    </Block>
  )
}

export default NotificationContainer;
