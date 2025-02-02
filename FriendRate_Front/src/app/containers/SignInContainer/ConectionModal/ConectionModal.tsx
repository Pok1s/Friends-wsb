"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import { Dispatch } from '@/app/REDUX/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from '@/i18n/client';
import modalStyle from "./styles.module.scss";
import hello from "../../../images/hello.png"
import { RoomContext } from '@/app/components/Context/RomContext';
import { fetchTempUser } from '@/app/REDUX/Unregistred/operation';



const style = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: "400px",
  bgcolor: '#313338',
  borderRadius: "24px 24px 0px 0px",
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: "16px",
};

export default function ConectionModal({ handleOpen, params, handleClose }) {
    const { t } = useTranslation(params, 'popUp-withoutReg');
    const dispatch:Dispatch = useDispatch();
    const { ws, me } = React.useContext(RoomContext)

    const generateRandomNumber = () => {
      return Math.floor(1000 + Math.random() * 9000);
  };

    const userName = `Unregistered User ${generateRandomNumber()}`;


const connectToRoom = async () => {
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
  const userName = `Unregistered User ${generateRandomNumber()}`;
  dispatch(fetchTempUser(userName))
  const userData = { userName, avatarURL: '', rate: 0, ratingCount: 0 };

  ws.emit('create-room', { peerId: me._id, userData });
};


  return (
    <div>
      <Modal
        open={handleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={modalStyle.modalWrapper}>
          <Image 
          className={modalStyle.imageHello}
          width={131}
          height={99}
          src={hello}
          alt={"hello"}
          />
            <p className={modalStyle.text}>{t("title1")} </p>
            <p className={modalStyle.text2}>{t("title2")} </p>
            <div className={modalStyle.buttonBox}>
              <button className={modalStyle.buttonLeft} onClick={handleClose}>{t("no")}</button>
              <button  className={modalStyle.buttonRight} onClick={connectToRoom}>{t("yes")}</button>
            </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}