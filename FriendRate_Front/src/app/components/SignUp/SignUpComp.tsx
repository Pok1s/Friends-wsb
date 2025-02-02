"use client"
import React from 'react'
import styles from "./SignUp.module.scss"; 
import { useState } from 'react';
import Container from '../Container';
import * as Yup from 'yup';
import Image from 'next/image';
import showIcon from "../../images/SignUp/show_icon.svg";
import hideIcon from "../../images/SignUp/hide_icon.svg";
import checkFalse from "../../images/SignUp/checkFalse.svg";
import checkTrue from "../../images/SignUp/checkTrue.svg";
import facebook from "../../images/SignUp/FB.svg";
import Google from "../../images/SignUp/Google.svg";
import TogleBtn from './TogleBtn';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { register } from '@/app/REDUX/Auth/operations';
import { Dispatch } from '@/app/REDUX/store';
import { useAuth } from '../../REDUX/Hooks/useAuth'
import { useTranslation } from '@/i18n/client';
import { TFunction } from 'i18next';

const SignupSchema = (t: TFunction<string, undefined>) =>  Yup.object().shape({
  email: Yup.string()
    .email(() => t("errorValidEmail"))
    .matches(
      /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
      () => t("errorValidEmail")
    ).required(() => t("plholdEmail")),
  password: Yup.string()
    .required(() => t("errorPassword"))
    .min(8, () => t("errorPassword"))
    .max(30, () => t("errorPassword"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/,
      () => t("errorPassword")
    ),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], () => t("errorConfirm"))
    .required(() => t("emptyErrorConfirm")),
});

const SignUpComp= ({params}) => {
  const router = useRouter();
  const dispatch:Dispatch = useDispatch();
  const { t } = useTranslation(params, 'sign-up');
  const { isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { user } = useAuth();

  const privacyPolicyLink = params === 'en' ? 'https://drive.google.com/file/d/1gr0CSGZOeOBMfdGxqFnaM2wf4fKSd5K_/view?usp=sharing' : 'https://drive.google.com/file/d/1oA9lMEL1HGP00rIt16mAtNiAItX_7oLr/view?usp=drive_link';
  const termsLink = params === 'en' ? 'https://drive.google.com/file/d/1D9sc5Gq6P6bzzsnk2Nt3ftlRi-JA7TVJ/view?usp=sharing' : 'https://drive.google.com/file/d/1TeUkZGRPACGfmGij4icaf21dmpKj4nJf/view?usp=sharing';

  const formik = useFormik({
          initialValues:{
            email: '',
            password: '',
            passwordRepeat: '',
          },
          validationSchema: SignupSchema(t),
          onSubmit: async (values, action) => {
            setIsError(false);
            const { passwordRepeat, ...valuesWithoutPasswordRepeat } = values;
            dispatch(register(valuesWithoutPasswordRepeat)).unwrap().then(res => {
              if (res.data.token) {
                action.resetForm();
              }
            }).catch(() => {
              setIsError(true);
              setErrorMessage(t('errorEmail'));
            });
          }
        })


  
 
  return (
    <>
    <Container>
    <TogleBtn/>

  <h2 className={styles.head}>{t("title")}</h2>

          <form className={styles.imputForm} onSubmit={formik.handleSubmit}>
            <label className={styles.fieldLabel} htmlFor="email">{t("email")}</label>
            <input className={ (!formik.touched.email || !formik.errors.email) && !isError ? styles.field : styles.fieldErr}
            id="email" 
            name="email" 
            placeholder={t("plholdEmail")} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onClick={() => setIsError(false)}
            value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email && (
              <span className={styles.errMes}>
                {formik.errors.email}
              </span>
            )}
            {isError === true && <span className={styles.errMes}>{errorMessage}</span>}
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
              placeholder={t("plholdPassword")} 
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
              placeholder={t("plholdPassword")}
              title="passwordRepeat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
            />

              {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
                        <span className={styles.errMes}>{formik.errors.passwordRepeat}</span>
                          )}

                  <div className={styles.checkbox}>
                  
                  <Image
                      onClick={() => setIsAccept(!isAccept)}
                      src={isAccept ? checkTrue : checkFalse}
                      alt="Icon"
                  />
              
                      <p className={styles.checkboxTxt}>{t("terms")}<a className={styles.tearms}  target="_blank" href={termsLink}>{t("terms2")}</a> {t("terms4")} <a className={styles.tearms} target="_blank" href={privacyPolicyLink}>{t("terms3")}</a></p> 
                  </div>
        
                  <div className={styles.bottomBox}>
        <button className={styles.signupBtn} type='submit' disabled={!isAccept}>{t("signUp")}</button>
        <div className={styles.signInTxt}>{t("signIn")}</div>

        <div className={styles.socialBox}>
          <a href="https://api.friendsrate.org/api/user/facebook" className={styles.socialIcon}>
          <Image
            src={facebook}
            alt="facebook"
          />
          <p className={styles.socialTxt}>Facebook</p>
          </a>  
          <a href="https://api.friendsrate.org/api/user/google" className={styles.socialIcon}>
            <Image
              src={Google}
              alt="Google"
            />
            <p className={styles.socialTxt}>Google</p>
          </a>

        </div>

        <p className={styles.bottomTxt}>{t("linkSignIn")} 
            <Link className={styles.socialTxt} href="/sign-in">
            {t("signIn")} 
            </Link>
        </p>
        </div>

          </form>

    </Container>
    </>
  )
}

export default SignUpComp
