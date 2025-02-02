'use client';
import React, { FC, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import Block from '../Block';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import { useRouter } from 'next/navigation';
import Label from '../Label';
import CheckEmail from '../CheckEmail';
import { UseTranslationResponse } from 'react-i18next';
import * as Yup from 'yup';
import { useAppDispatch } from '@/app/REDUX/Hooks/hooks';
import { forgotPassword } from '@/app/REDUX/Auth/operations';

type Props = {
  setModalIcon: (value: boolean) => void,
  useTranslation: (lng: string, ns: string, obj?: any) => UseTranslationResponse<string, undefined>,
  lng: any,
  modalIcon: boolean,
}

const Restore: FC<Props> = ( { modalIcon, setModalIcon, useTranslation, lng } ) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation(lng, 'restorePassword');

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t('errorEmail')}`)
      .matches(
        /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
        `${t('invalidEmail')}`
      )
      .required(`${t('errorEmail')}`),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, action) => {
          setError(false);
            const { email } = values;
            dispatch(forgotPassword(email))
            .unwrap()
            .then(res => {
              if (res.data.status !== '500') {
                setModalIcon(true);
                action.resetForm();
              }
            }).catch(() => {
              setError(true);
              setModalIcon(false);
              setErrorMessage(t('invalidEmail'));
            });
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Block className={styles['content-bottom']}>
            <Label className={styles.fieldLabel} htmlFor="email">
              {t('email')}
            </Label>
            <Field
              className={!error ? styles['field-restore'] : styles['field-restore__error']}
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={() => setError(false)}
              placeholder={t('email')}
            />
            {errors.email && touched.email && (
              <ErrorMessage className={styles.errMes} component="span" name="email" />
            )}
            {error && (
               <span className={styles.errMes}>{errorMessage}</span>
            )}
          </Block>
          <Block className={styles['button-bottom']}>
            {t('description')}
          </Block>

          <ButtonSubmit
            className={styles.signupBtn}
            type={TypeButton.SUBMIT}
            disabled={!!errors.email || !values.email}
          >
            {t('btn')}
          </ButtonSubmit>
        </Form>
        )}
      </Formik>

      {modalIcon === true && (
        <CheckEmail
          setModalIcon={setModalIcon}
          useTranslation={useTranslation}
          router={router}
          lng={lng}
      />
      )}
    </>
  )
}

export default Restore;
