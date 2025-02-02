"use client"
import React, { ChangeEvent, useState } from 'react';
import styles from "./edit.module.scss"; 
import Container from '../Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import showIcon from "../../images/SignUp/show_icon.svg";
import hideIcon from "../../images/SignUp/hide_icon.svg";
import Navbar from '../NavBar/Navbar';
import BasicModal from './DeleteModal';
import { GenderSelector } from '../Selectors/GenderSelector/GenderSelector';
import { LangSelector } from '../Selectors/LangSelector/LangSelector';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/app/REDUX/store';
import { updateUserData } from '@/app/REDUX/Auth/operations';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { TFunction } from 'i18next';
import { parseISO } from 'date-fns';

const SignupSchema = (t: TFunction<string, undefined>) =>  Yup.object().shape({
  username: Yup.string()
  .trim()
  .min(3, () => t("nameError"))
  .max(25, () => t("nameError"))
  .matches(/^[a-zA-Z0-9\s'-]+$/, () => t("nameErrorSpacesAllowed"))
  .required(() => t("nameError")),
  birthday: Yup.string()
  .required(() => t("birthDateError"))
  .matches(
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(192[5-9]|19[3-9]\d|20[0-1]\d|202[0-3])$/,
    () => t('invalidDateError')
  ).test(`${t('invalidDateError')}`, `${t('invalidDateError')}`, (value) => {
    const reverse = value.split('.').reverse().join('-');

    return parseISO(reverse) instanceof Date && !isNaN(+(parseISO(reverse)));
  }),
  email: Yup.string()
  .email(()=> t('emailError'))
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    () => t('emailError')
  )
  .min(5, () => t('emailMinError'))
  .max(50, () => t('emailMaxError'))
  .required(() => t('required')),
  password: Yup.string()
  .min(8, () => t('passwordError'))
  .max(30, () => t('passwordError'))
  .matches(
    /^(?=.*[a-z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/,
    () => t('passwordError')
  ),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], () => t('passwordRepeatError')),
  about: Yup.string()
    .min(10, () => t("errorAtLeast"))
    .max(255, () => t("errorLess"))
    .required(() => t('aboutError'))

});



const EditProfile = ({params}) => {
    const { t } = useTranslation(params, 'edit');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [open, setOpen] = useState(false);
    const [openGen, setOpenGen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch: Dispatch = useDispatch();
    const { user } = useAuth();
    const [gender, setGender] = useState(user?.gender);
    const [date, setDate] = useState(user?.birthday);
    const [language, setLanguage] = useState(user?.language);
    const router = useRouter();

    const formik = useFormik({
      initialValues: {
        username: user?.username || '',
        email: user?.email || '',
        birthday: user?.birthday || '',
        gender: user?.gender || '',
        password: '',
        passwordRepeat: '',
        about: user?.about || ''
      },
        validationSchema: SignupSchema(t),
        onSubmit: async (values, action) => {
          const updatedValues = {
            ...values,
            gender: gender, 
            language: language
          };
          dispatch(updateUserData(updatedValues));
          action.resetForm();
          router.push('/profile')
          
        }
      })

      const handleInputChange = (event) => {
        const input = event.target.value.replace(/\D/g, '');

        let formattedDate = input
          .replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1.$2.$3')
          .replace(/^(\d{2}\.\d{2})(\d{4})/, '$1.$2');

        if (event.nativeEvent.inputType === "deleteContentBackward" && formattedDate.slice(-1) === '.') {
          formattedDate = formattedDate.slice(0, -1);
        }

        setDate(formattedDate);
        formik.handleChange(event);
      };

      const handleSelectChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setOpen(true);
        
      };

      const handleSelectGenderChange = (selectedGender) => {
        setGender(selectedGender);
        setOpenGen(true);
        
      };

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

  return (
    <>
    <Container style={{ paddingBottom: "30px", overflowY: 'auto' }}>
    <h2 className={styles.editHeaad}>{t("title")}</h2>

    <form className={styles.inputForm} onSubmit={formik.handleSubmit}>
        <label className={styles.fieldLabelM32} htmlFor="username">
        {t("name")}
        </label>
        <input
            className={styles.field}
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
        />

{formik.touched.username && formik.errors.username && (
          <span className={styles.errMes}>{formik.errors.username}</span>
        )}

        <label className={styles.fieldLabelM32} htmlFor="email">
        {t("email")}
        </label>
        <input
            className={!formik.touched.email || !formik.errors.email ? styles.field : styles.fieldErr}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
        />

{formik.touched.email && formik.errors.email && (
          <span className={styles.errMes}>{formik.errors.email}</span>
        )}

        <label className={styles.fieldLabelM32} htmlFor="birthday">
        {t("birthDay")}
        </label>
        <input
            className={!formik.touched.birthday || !formik.errors.birthday ? styles.field : styles.fieldErr}
            id="birthday"
            name="birthday"
            type="text"
            value={date}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
        />

{formik.touched.birthday && formik.errors.birthday && (
          <span className={styles.errMes}>{formik.errors.birthday}</span>
        )}
      <div className={styles.genderLangBox}>
      <GenderSelector onSelectGender={handleSelectGenderChange} userGender={gender} params={params} />
      <LangSelector onSelectLanguage={handleSelectChange} userLanguage={language} params={params}/>
      </div>
        <label className={styles.fieldLabel} htmlFor="password">
        {t("password")}
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image  className={styles.icon} src={showIcon} alt="show_icon"  />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon"  />
                )}
              </div>
            </label>
            <input className={!formik.touched.password || !formik.errors.password ? styles.field : styles.fieldErr}
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t("confirmPl")}
              title="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            >
              
            </input>

          {formik.touched.password && formik.errors.password && (
          <span className={styles.errMes}>{formik.errors.password}</span>
            )}

            <label className={styles.fieldLabel} htmlFor="passwordRepeat">
            {t("confirm")}
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Image className={styles.icon} src={showIcon} alt="show_icon" />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon"  />
                )}
              </div>
            </label>
            <input className={!formik.touched.passwordRepeat || !formik.errors.passwordRepeat  ? styles.field : styles.fieldErr}
              id="passwordRepeat"
              type={showPassword ? 'text' : 'password'}
              name="passwordRepeat"
              placeholder={t("confirmPl")}
              title="passwordRepeat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
              
            />

              {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
                        <span className={styles.errMes}>{formik.errors.passwordRepeat}</span>
                          )}

            <label className={styles.fieldLabelM32} htmlFor="about">
            {t("about")}
            </label>
            <textarea
                className={!formik.touched.about || !formik.errors.about ? styles.field : styles.fieldErr}
                id="about"
                name="about"
                placeholder= {t("enterAbout")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                rows={4} 
                cols={50} 
            />
            {formik.touched.about && formik.errors.about && (
          <span className={styles.errMes}>{formik.errors.about}</span>
        )}


            <button type='submit' className={styles.saveBtn}>{t("save")}</button>

            <div className={styles.deleteBtn} onClick={handleOpenModal}>{t("delete")}</div>
            <BasicModal
                openModal={isModalOpen}
                handleCloseModal={handleCloseModal}
                params={params}
                modalTitle="Text in a modal"
                modalContent="Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
              />
                 
</form>


    </Container> 
  <Navbar style={{ position: 'fixed'}} /> 
  </>
  )
}

export default EditProfile;