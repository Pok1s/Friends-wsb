import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import Image from 'next/image';
import { RoomContext } from '../../Context/RomContext';
import { useRouter } from 'next/navigation';
import RateModal from './RateModal';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { usersNames } from '@/app/REDUX/Users/selectors';
import { OpositUser } from '../AuthorizedUser';


const TimerAndButtons = ({
  time,
  callEnd,
  call,
  microfonClose,
  microfon,
  formatTime,
  params
}) => {
  const { ws, me, peers, stream, rateModalOpen, openRateModal, clearPeers } = useContext(RoomContext);
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const dispatch = useDispatch()
  const { user, unrUser } = useAuth(); 
  const usersInRoom = useSelector(usersNames)
  console.log(usersInRoom);
  

  
 
  const opositUser: OpositUser | null = Array.isArray(usersInRoom) 
  ? usersInRoom.find((u: OpositUser) => u.userName !== user?.username) || null 
  : null;

  useEffect(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted, stream]); 
  
  const handleEndCall = () => {
    ws.emit("end-call");
  
    if (user !== null && !opositUser?.userName.startsWith('Unregistered User')) {
      handleOpenModal();
      clearPeers();
    } else {
      if (user) {
        router.push('/main');
      } else {
        router.push('/');
      }
    }
  
    if (isMuted) {
      setIsMuted(false);
    }
  };

  const onMuteChange = () => {
    setIsMuted(!isMuted);
  };



const handleOpenModal = () => {
  openRateModal()
};



  return (
    <div className={styles['connect__nav']}>
      <span className={styles["connect__timer"]}>{formatTime(time)}</span>
      <div className={styles["connect__btn-block"]}>
      <button style={{background: "transparent", border: 'none'}}  className={styles["connect__call"]} onClick={onMuteChange}>
        {isMuted
          ? <Image style={{ width: '56px', height: '56px', background: 'transparent' }} src={microfonClose} alt="Microfon Close" />
          : <Image style={{ width: '56px', height: '56px', background: 'transparent' }} src={microfon} alt="Microfon" />
        }
      </button>
      <button onClick={handleEndCall} style={{background: "transparent", border: 'none', zIndex: '1000'}}><Image src={callEnd} alt="Call-End" className={styles["connect__call-end"]} /></button>
      </div>

        <RateModal
          rateModalOpen={rateModalOpen}
          params={params}
          modalTitle="Text in a modal"
          modalContent="Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
        />
 
    </div>
  )
}

export default TimerAndButtons;
