"use client"
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import TogleBtn from '../SignUp/TogleBtn';
import Container from '../Container';
import styles from './information.module.scss';
import male from '../../images/Information/Male.svg';
import female from '../../images/Information/Female.svg';
import other from '../../images/Information/Other.svg';
import malePressed from '../../images/Information/MalePressed.svg';
import femalePressed from '../../images/Information/FemalePressed.svg';
import otherPressed from '../../images/Information/OtherPressed.svg';
import { refreshUser, updateUserData} from "../../REDUX/Auth/operations"
import { useDispatch, useSelector } from 'react-redux';
import {selectIsLoggedIn, selectUser} from '../../REDUX/Auth/selector'
import { Dispatch } from '@/app/REDUX/store';
import { useTranslation } from '@/i18n/client';
import { TFunction } from 'i18next';
import CongratsModal from './ConfratsModal/CongratsModal';

const Information = ({params}) => {
  const { t } = useTranslation(params, 'signUpInform');
  const dispatch: Dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const isNotError = useSelector(selectIsLoggedIn)
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [openCongrads, setOpenCongrads] = useState(false);

  const createAccountSchema = (t: TFunction<string, undefined>) =>  Yup.object().shape({
    username: Yup.string()
    .min(3, () => t("errorSymbols"))
    .max(25, () => t("errorSymbols"))
    .matches(/^[a-zA-Z0-9_\.\-]+$/, () => t("errorSymbols"))
    .required(() => t("plholdUserName"))
    .test(`${t('errorUserName')}`, `${t('errorUserName')}`, (value) => {
      return userData?.username !== value;
    }),
    birthday: Yup.string()
    .required(() => t("errorBirthDayFormat"))
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(192[5-9]|19[3-9]\d|20[0-1]\d|202[0-3])$/,
      () => t("errorBirthDay")
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      birthday: '',
      gender: '',
    },
    validationSchema: createAccountSchema(t),
    onSubmit: async (values, actions) => {
      const { birthday } = values;
      const combinedData = {
        ...values,
        ...userData,
        birthday: birthday.toString(),
        username: values?.username || '',
        gender: values?.gender || '',
        email: userData?.email || '', 
      };
      dispatch(updateUserData(combinedData));
      actions.resetForm();
      if (isNotError) {
        setOpenCongrads(true)
      }
    
    },
  });

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, '');
    const formattedDate = input
      .replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1.$2.$3')
      .replace(/^(\d{2}\.\d{2})(\d{4})/, '$1.$2');
    setDate(formattedDate);
    formik.handleChange(event); 
  };

  const handleOptionClick = (option) => {
    setGender((prevGender) => (prevGender === option ? '' : option));
    formik.setFieldValue('gender', option); 
  };

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Container>
      <TogleBtn />
      <h2 className={styles.infoHead}>{t("title")}</h2>

      <form className={styles.imputForm} onSubmit={formik.handleSubmit}>
        <label className={styles.fieldLabel} htmlFor="username">
        {t("userName")}
        </label>
        <input className={!formik.touched.username || !formik.errors.username ? styles.field : styles.fieldErr}
          id="username"
          name="username"
          placeholder={t("plholdUserName")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <span className={styles.errMes}>{formik.errors.username}</span>
        )}

        <label className={styles.fieldLabel} htmlFor="birthday">
        {t("birthDay")}
        </label>
        <input className={!formik.touched.birthday || !formik.errors.birthday  ? styles.field : styles.fieldErr}
          type="text"
          id="birthday"
          name="birthday"
          value={date}
          onChange={handleInputChange}
          maxLength={10}
          placeholder={t("plholdBirthDay")}
          onBlur={formik.handleBlur}
        />
        {formik.touched.birthday && formik.errors.birthday && (
          <span className={styles.errMes}>{formik.errors.birthday}</span>
        )}
     
        <ul className={styles.genderBox} >
       
          <p className={styles.boxTxt}>{t("gender")}</p>
          <li className={styles.genderItem} onClick={() => handleOptionClick('Male')}>
            <Image src={gender === 'Male' ? malePressed : male} alt="male" />
            <p className={styles.genderTxt}>{t("male")}</p>
          </li>

          <li className={styles.genderItem} onClick={() => handleOptionClick('Female')}>
            <Image src={gender === 'Female' ? femalePressed : female} alt="female" />
            <p className={styles.genderTxt}>{t("female")}</p>
          </li>

          <li className={styles.genderItem} onClick={() => handleOptionClick('Other')}>
            <Image src={gender === 'Other' ? otherPressed : other} alt="other" />
            <p className={styles.genderTxt}>{t("other")}</p>
          </li>
        </ul>

        <button
          className={styles.continueBtn}
          type="submit"
          disabled={!formik.isValid || !formik.dirty || !gender}
        >
          {t("account")}
        </button>
      </form>
      <CongratsModal onOpen={openCongrads} t={t}/>
    </Container>
  );
};

export default Information;