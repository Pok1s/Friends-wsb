"use client"
import { useState } from "react";
import { useTranslation } from '@/i18n/client';
import styles from './GenderSelector.module.scss';


export const GenderSelector = ({ onSelectGender, userGender, params }) => {
    const { t } = useTranslation(params, 'main-page')
    const [openGen, setOpenGen] = useState(false);
    const [gender, setGender] = useState(userGender || t("male"));
    

    const handleSelectGenderChange = (newGender) => {
        setGender(newGender);
        setOpenGen(true);
        onSelectGender(newGender);
        
      };
  return (
    <> 
    <label className={styles.fieldLabel} htmlFor="gender">
    {t("gender")}
</label>
    <div className={openGen ? styles.customSelectOpen : styles.customSelect} onClick={() => setOpenGen(!openGen)}>
    {!openGen ? (
        <span className={styles.options}>{gender}</span>
    ) : (
        <div className={styles.options2}>
        <div className={styles.options2} onClick={() => handleSelectGenderChange(() => t("male"))}>
        {t("male")}
        </div>
        <div className={styles.options2} onClick={() => handleSelectGenderChange(() => t("female"))}>
        {t("female")}
        </div>
        <div className={styles.options2} onClick={() => handleSelectGenderChange(() => t("other"))}>
        {t("other")}
        </div>
        </div>
    )}
    </div></>
  )
}
