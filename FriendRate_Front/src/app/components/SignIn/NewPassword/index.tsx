'use client';
import React, { useEffect, useState } from 'react';
import Block from '../Block';
import showIcon from "../../../images/SignUp/show_icon.svg";
import hideIcon from "../../../images/SignUp/hide_icon.svg";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Label from '../Label';
import BlockInput from '../BlockInput';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';
import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { useAppDispatch, useAppSelector } from '@/app/REDUX/Hooks/hooks';
import { selectUser } from '../../../REDUX/Auth/selector';
import { logIn, resetPassword } from '@/app/REDUX/Auth/operations';
import { usePathname, useRouter } from 'next/navigation';

const cutString =(str: string) => {
  const newStr = str === undefined ? '' : str.split('/');

  return newStr[newStr.length - 1];
}

const Schema = (t: TFunction<string, undefined>) => Yup.object().shape({
    password: Yup.string()
    .required(() => t("errorEmptyPassword"))
    .min(8, () => t("errorPassword"))
    .max(30, () => t("errorPassword"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/,
      () => t("errorPassword")
    ),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], () => t("errorConfirm"))
    .required(() => t('errorConfirmEmpty')),
  });

const NewPassword = ({ lng, token, setPath }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation(lng, 'new-password');
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectUser)?.email;
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Schema(t)}
        onSubmit={async (values, action) => {
          const data = {
            password: values.password,
            confirmPassword: values.confirmPassword,
            token,
          }
          dispatch(resetPassword(data));
          setTimeout(() => {
            dispatch(logIn({ email: email as string, password: values.password }));
            action.resetForm();
            router.push(`/${lng}/main`);
            setPath('');
          }, 500);
        }}
      >
        {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
          <Form onSubmit={handleSubmit} className={styles['imputForm-new-password']}>
              <BlockInput>
                <Label className={styles.fieldLabel} htmlFor="password">
                  {t('password')}
                </Label>
                <Block className={styles["block-password"]}>
                  <Field className={styles.field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t("plholdPassword")}
                    title="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></Field>
                </Block>
                {(!errors.password || !touched.password) && (
                  <Block className={styles['confirm-rule']}>
                    {t('error')}
                  </Block>
                )}

                {errors.password && touched.password && (
                  <ErrorMessage className={styles.errMes} component="span" name="password" />
                )}
              </BlockInput>

              <BlockInput>
                <Label className={styles.fieldLabel} htmlFor="confirm-password">
                  {t('confirm')}
                </Label>
                <Block className={styles["block-password"]}>
                  <Field className={styles.field}
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder={t("plholdConfirm")}
                    title="confirm-password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></Field>

                  <Block
                    className={styles.icon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword
                      ? <Image className={styles.icon} src={showIcon} alt="show_icon" />
                      : <Image className={styles.icon} src={hideIcon} alt="hide_icon" />
                    }
                  </Block>
                </Block>
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorMessage className={styles.errMes} component="span" name="confirmPassword" />
                )}
              </BlockInput>

              <Block className={styles['block-submit']}>
                <ButtonSubmit
                  className={styles.signupBtn}
                  type={TypeButton.SUBMIT}
                  disabled={!!errors.password || !!errors.confirmPassword || !values.password || !values.confirmPassword}
                >
                  {t('complete')}
                </ButtonSubmit>
              </Block>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default NewPassword;
