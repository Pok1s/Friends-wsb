'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Container from '../Container';
import LoaderConnect from './LoaderConnect/LoaderConnect';
import styles from './styles.module.scss';
import AuthorizedUser from './AuthorizedUser';
import Navbar from '../NavBar/Navbar';
import microfon from '../../images/microfon-open.svg';
import callEnd from '../../images/call-end.svg';
import microfonClose from '../../images/close-microfon.svg';
import TimerAndButtons from './TimerAndButtons';
import { Audio } from '../ChatRoomComp/Video';
import { RoomContext } from '../Context/RomContext';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import PationModal from './PationModal/PationModal';

const ConnectPage = ({ lng }) => {
  const [time, setTime] = useState(0);
  const [timeToConnect, setTimeToConnect] = useState(0);
  const [call, setCall] = useState(false);
  const [search, setSearch] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const { ws, me, peers, stream } = useContext(RoomContext);
  const { user, unrUser } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToConnect(prevTime => prevTime + 1);
      if (isConnected) {
        setTime(prevTime => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = useCallback((value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!isConnected){
    if (formatTime(timeToConnect) === "1:00") {
      handleOpen();
    }}
  }, [timeToConnect, formatTime, isConnected]);

  useEffect(() => {
    if (Object.values(peers).length > 1) {
      setIsConnected(true);
      setSpinner(false);
      setCall(true);
      setSearch(false);
    }
  }, [peers]);

  return (
    <div className={styles.connect}>
      <Container>
        <div className={styles["connect__content"]}>
          <div className={styles["connect__content-block"]}>
            {spinner && <LoaderConnect />}
            <AuthorizedUser
              search={search}
              isConnected={isConnected}
              spinner={spinner}
              call={call}
              lng={lng}
            />
            {isConnected && (
              <>
                {/* <Video stream={stream} /> */}
                {Object.values(peers).map((peer: any) => (
                  peer.id !== me?.id && <Audio key={peer.id} stream={peer.stream} />
                ))}
              </>
            )}
          </div>
          {!spinner && (
            <TimerAndButtons
              call={call}
              microfonClose={microfonClose}
              microfon={microfon}
              callEnd={callEnd}
              time={time}
              formatTime={formatTime}
              params={lng}
            />
          )}
          {spinner && search && <span className={styles["connect__text"]}>Поиск</span>}
          {spinner && isConnected && <span className={styles["connect__text"]}>Соединение</span>}
          {spinner && isConnected && <span className={styles["connect__text"]}>Подключено</span>}
        </div>
        {!spinner && <div className={styles["connect__gradient"]}></div>}
        {!spinner && <div className={styles["connect__gradient-right"]}></div>}
        {!spinner && <div className={styles["connect__gradient-bottom"]}></div>}
        <PationModal handleOpen={open} handleClose={handleClose} params={lng} />
      </Container>
    </div>
  );
}

export default ConnectPage;