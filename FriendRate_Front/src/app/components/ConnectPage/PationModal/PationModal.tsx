"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import { useTranslation } from '@/i18n/client';
import modalStyle from "./PationModal.module.scss";
import cat from "../../../images/Cat.png"
import { RoomContext } from '../../Context/RomContext';
import { useRouter } from 'next/navigation';




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

export default function PationModal({ handleOpen, params, handleClose }) {
    const { t } = useTranslation(params, 'popUp-connect');
    const { ws } = React.useContext(RoomContext);
    const router = useRouter();
  
    const handleEndCall = () => {
    ws.emit("end-call");
    handleClose();
    router.push('/');
}
   
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
          width={120}
          height={96}
          src={cat}
          alt={"Cat"}
          />
            <p className={modalStyle.text1}>{t("title1")} </p>
            <p className={modalStyle.text2}>{t("title2")} </p>
            <div className={modalStyle.buttonBox}>
              <button className={modalStyle.buttonLeft} onClick={handleClose}>{t("continue")}</button>
              <button  className={modalStyle.buttonRight} onClick={handleEndCall}>{t("Back")}</button>
            </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}