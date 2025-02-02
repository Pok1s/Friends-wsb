"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import styles from "./RateModal.module.scss";
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import { Dispatch } from '@/app/REDUX/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setUserRate } from '@/app/REDUX/Auth/operations';
import { useTranslation } from '@/i18n/client';
import styleModal from './RateModal.module.scss'
import emptystar from '../../../images/ratemodal/emptystar.svg'
import fullstar from '../../../images/ratemodal/fullstar.svg'
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { usersNames } from '@/app/REDUX/Users/selectors';
import { useRouter } from 'next/navigation';
import { RoomContext } from '../../Context/RomContext';
import { OpositUser } from '../AuthorizedUser';


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



export default function RateModal({ rateModalOpen, modalTitle, modalContent, params }) {
    const { t } = useTranslation(params, 'popUp-rate');
    const [rate, setRate] = React.useState(0)
    const dispatch:Dispatch = useDispatch();
    const {  closeRateModal } = React.useContext(RoomContext);

    const { user } = useAuth(); 
    const usersInRoom = useSelector(usersNames)

    const opositUser: OpositUser | null = Array.isArray(usersInRoom) 
    ? usersInRoom.find((u: OpositUser) => u.userName !== user?.username) || null 
    : null;
    const username = opositUser?.userName
    const router = useRouter();

    const onSetUserRate = () => {
        dispatch(setUserRate({username, rate}))
        closeRateModal()
        router.push(`/main`);
        
    }

    return (
        <div>

          <Modal
            open={rateModalOpen}
            onClose={(_, reason) => reason === "backdropClick" ? null : closeRateModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <h2 className={styleModal.modalHead}>{t("title")}</h2>
                    <div className={styleModal.starBox}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={`star-${index}`}
                            onClick={() => setRate(index + 1)}
                            src={index < rate ? fullstar : emptystar}
                            width={40}
                            alt="Star"
                            className={styles.star}
                        />
                        ))}                                        
                    </div>
                <button onClick={onSetUserRate} className={styleModal.confirmBtn} disabled={rate <= 0}>{t("confirm")}</button>
            </Box>
          </Modal>
        </div>
      );
    }