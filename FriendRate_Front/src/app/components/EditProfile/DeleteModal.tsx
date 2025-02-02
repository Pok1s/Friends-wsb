"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import styles from "./DeleteModal.module.scss";
import Image from 'next/image';
import checkFalse from "../../images/SignUp/checkFalse.svg";
import checkTrue from "../../images/SignUp/checkTrue.svg";
import Modal from '@mui/material/Modal';
import Navbar from '../NavBar/Navbar';
import { Dispatch } from '@/app/REDUX/store';
import { useDispatch } from 'react-redux';
import { deleteUser } from '@/app/REDUX/Auth/operations';
import { useTranslation } from '@/i18n/client';


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

export default function BasicModal({ openModal, handleCloseModal, modalTitle, modalContent, params }) {
    const { t } = useTranslation(params, 'popUp-delete');
    const [dontwant, setIsDontwant] = React.useState(false);
    const [another, setIsAnother] = React.useState(false);
    const [problems, setIsProblems] = React.useState(false);
    const dispatch:Dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className={styles.modalHead}>{t("title")}</div>
            <div className={styles.BoxWithCheckBox}>
                
            <div className={styles.checkbox}>       
              <Image
                  onClick={() => setIsDontwant(!dontwant)}
                  src={dontwant ? checkTrue : checkFalse}
                  alt="Icon"
              />
          
                  <p className={styles.checkboxTxt}>{t("service")}</p> 
              </div>
              
              <div className={styles.checkbox}>    
              <Image
                  onClick={() => setIsAnother(!another)}
                  src={another ? checkTrue : checkFalse}
                  alt="Icon"
              />
          
                  <p className={styles.checkboxTxt}>{t("account")}</p> 
              </div>
              
              <div className={styles.checkbox}>      
              <Image
                  onClick={() => setIsProblems(!problems)}
                  src={problems ? checkTrue : checkFalse}
                  alt="Icon"
              />
          
                  <p className={styles.checkboxTxt}>{t("problem")}</p> 
              </div>
            </div>
            <div className={styles.warningMes}>{t("description")}<br></br> {t("description2")}</div>
            <button 
                className={styles.deleteBtn}
                disabled={!dontwant && !another && !problems} 
                type='button'
                onClick={()=>{dispatch(deleteUser())}}
                >
                {t("delete")}
                </button>
            <Navbar/>
        </Box>
      </Modal>
    </div>
  );
}