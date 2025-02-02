
import { useState } from "react";
import styles from './LangSelector.module.scss';
import { useTranslation } from '@/i18n/client';

export const  LangSelector = ({ onSelectLanguage, userLanguage, params }) => {
    const { t } = useTranslation(params, 'main-page');
    const [language, setLanguage] = useState(userLanguage || t("ukr"));
    const [open, setOpen] = useState(false);

    const handleSelectChange = (newLanguage) => {
        setLanguage(newLanguage);
        setOpen(false); 
        onSelectLanguage(newLanguage);
    };
  return (
    <>
      <label className={styles.fieldLabel} htmlFor="language">
      {t("lng")}
            </label>
            <div className={open ? styles.customSelectOpen : styles.customSelect} onClick={() => setOpen(!open)}>
            {!open ? (
                <span className={styles.options}>{language}</span>
            ) : (
                <div className={styles.options2}>
                <div className={styles.options2} onClick={() => handleSelectChange(() => t("ukr"))}>
                {t("ukr")}
                </div>
                <div className={styles.options2} onClick={() => handleSelectChange(() => t("en"))}>
                {t("en")}
                </div>
                </div>
            )}
            </div>
    </>
  )
}
