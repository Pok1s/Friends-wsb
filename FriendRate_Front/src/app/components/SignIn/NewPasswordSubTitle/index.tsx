import { useTranslation } from "@/i18n/client";
import Block from "../Block";

const NewPasswordSubTitle = ({ lng, styles }) => {
  const { t } = useTranslation(lng, 'new-password');
  return (
    <Block className={styles['description-new-password']}>
        {t('subTitle')}
    </Block>
  )
}

export default NewPasswordSubTitle;