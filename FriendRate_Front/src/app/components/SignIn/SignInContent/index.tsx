import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { FC } from 'react';
import styles from '../../../containers/SignInContainer/styles.module.scss';
import BlockInput from '../BlockInput';
import Label from '../Label';
import Block from '../Block';
import Image from 'next/image';
import showIcon from "../../../images/SignUp/show_icon.svg";
import hideIcon from "../../../images/SignUp/hide_icon.svg";
import cross from '../../../images/SignUp/cross.svg';
import Link from 'next/link';
import ButtonSubmit, { TypeButton } from '../ButtonSubmit';
import { FormValue } from '@/app/containers/SignInContainer';
import { UseTranslationResponse } from 'react-i18next';
import { logIn } from '@/app/REDUX/Auth/operations';
import { useAppDispatch } from '@/app/REDUX/Hooks/hooks';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

type Props = {
  showPassword: boolean,
  setRedirect: (value: boolean) => void,
  setShowPassword: (value: boolean) => void,
  useTranslation: (lng: string, ns: string, obj?: any) => UseTranslationResponse<string, undefined>,
  lng: any,
  isError: boolean,
  setIsError: (value: boolean) => void,
}

const SignInContent: FC<Props> = (
  {
    showPassword,
    setRedirect,
    setShowPassword,
    useTranslation,
    setIsError,
    lng,
    isError,
  }
) => {
  const { t } = useTranslation(lng, 'sign-in');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
    .email('Please enter a valid email address.')
    .matches(
      /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
      'Please enter a valid email address.'
    )
    .min(5, 'Email should be at least 5 characters')
    .max(50, 'Email should not exceed 50 characters')
    .required('Required'),
    password: Yup.string()
    .required('Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
    .min(8, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
    .max(30, 'Password must be 8-30 characters and a combination of numbers, letters and special symbols.')
    .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/, 'Incorrect email or password',)
  });

  const handleLogin = (formValue: FormValue, action: FormikHelpers<FormValue>) => {
    setIsError(false);
    const { email, password } = formValue;

    dispatch(logIn({email, password})).unwrap().then((res) => {
      if (res.token) {
        action.resetForm();
        router.push(`/${lng}/main/`);
      }
    }).catch(() => {
      setIsError(true);
    });

    
  }

  return (
    <>
        <Formik
          validationSchema={SignInSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleLogin}
        >
          {({ errors, values, touched, handleChange, handleSubmit, handleBlur, setFieldValue, isSubmitting }) => (
          <Form className={styles.imputForm} onSubmit={handleSubmit}>
            <BlockInput>
              <Label className={styles.fieldLabel} htmlFor="email">{t('email')}</Label>
              <Field
                className={styles.field}
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("email")}
              />
              {touched.email && errors.email && (
                <Block className={styles["reset"]}>{errors.email}</Block>
              )}
            </BlockInput>

            <BlockInput>
              <Label className={styles.fieldLabel} htmlFor="password">
              {t("password")}
              </Label>
              <Block className={styles["block-password"]}>
                <Field className={(touched.password && errors.password) || isError ? styles.errorPasword : styles.field }
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={t('plholdPassword')}
                  title="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClick={() => setIsError(false)}
                />
                {isError || (touched.password && errors.password) ?
                  (
                    <Block className={styles.icon}>
                      <Image onClick={() => setFieldValue('password', '')} className={styles.icon} src={cross} alt="show_cross" />
                    </Block>
                  ) :
                 (<Block
                className={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
              >
                  {showPassword ? (
                  <Image className={styles.icon} src={showIcon} alt="show_icon" />
                ) : (
                  <Image className={styles.icon} src={hideIcon} alt="hide_icon" />
                )}
              </Block>) }
                
              </Block>
              {isError || (touched.password && errors.password)
              ? (<Block className={styles["reset"]}>
                    {isError ? t('error') : errors.password}. <Link
                    onClick={() => setRedirect(true)}
                    className={styles["reset__link"]}
                    href={"sign-in/restore"}
                  >
                    {t('errorReset')}
                  </Link>
                </Block>)
              : <Link className={styles.forgetPassword} href={'sign-in/restore'}>{t('forgetPass')}</Link>}
            </BlockInput>

            <ButtonSubmit
              className={styles.signupBtn}
              type={TypeButton.SUBMIT}
              disabled={!values.email || !values.password || !!(errors.password || errors.email)}
            >
              {t('continue')}
            </ButtonSubmit>
          </Form>
          )}
        </Formik>
    </>
  )
}

export default SignInContent;
