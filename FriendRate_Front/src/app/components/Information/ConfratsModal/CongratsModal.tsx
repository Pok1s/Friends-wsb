
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import PaperAirplane from "../../../images/PaperAirplane.png";
import styles from './CongratsModal.module.scss'

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  

export default function CongratsModal({onOpen, t }) {
    const router = useRouter();
    const [open, setOpen] = useState(onOpen);
    
    useEffect(() => {
        setOpen(onOpen); 
      }, [onOpen]);
    
    
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
    setOpen(false); 
    router.push('/main')   
    }
    

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <div className={styles.congratsBlock}>
            <h3 className={styles.congratsHead}>{t("congratuate")} </h3>
            <Image
                    className={styles.congratsImg}
                    src={PaperAirplane}
                    alt="PaperAirplane"
                />
           </div>
            <p className={styles.congratsTxt}>{t("congratuate2")}</p>
            <button className={styles.congratsBtn} onClick={handleClose}>ОК</button>
        </Box>
      </Modal>
    </div>
  );
}