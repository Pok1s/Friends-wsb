"use client"
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../NavBar/Navbar';
import MainImg from '../../images/Main/mainimg.png';
import Logo from '../../images/Main/Logo.svg';
import styles from "./Main.module.scss"; 
import Image from 'next/image';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from './MuiThemeProvider';
import { GenderSelector } from '../Selectors/GenderSelector/GenderSelector';
import { LangSelector } from '../Selectors/LangSelector/LangSelector';
import { useTranslation } from '@/i18n/client';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { RoomContext } from '../Context/RomContext';

const Main = ({params}) => {
  const [value, setValue] = useState<number[]>([18, 99]);
  const [buttonText, setButtonText] = useState('group');
  const { t } = useTranslation(params, 'main-page');
  const [selectedLanguage, setSelectedLanguage] = useState(t("ukr"));
  const [selectedGender, setSelectedGender] = useState(t("maile"));
  const { ws, me } = useContext(RoomContext);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserData({
        userName: user.username,
        avatarURL: user.avatarURL,
        rate: user.rate,
        ratingCount: user.ratingCount
      });
    }
  }, [user]);

  const [userData, setUserData] = useState(() => {
    return {
      userName: user?.username,
      avatarURL: user?.avatarURL,
      rate: user?.rate,
      ratingCount: user?.ratingCount
    };
  });

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    const minDistance = 6;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage as string);
  };

  const handleGenderChange = (newGender: string) => {
    setSelectedGender(newGender as string);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.trim(); 

    if (newValue === "") {
      newValue = ""; 
    }

    let parsedValue = parseInt(newValue, 10);

    if (isNaN(parsedValue) || parsedValue < 1) {
      parsedValue = 0; 
    } else if (parsedValue > 99) {
      parsedValue = 0; 
    }

    const updatedValue = [...value];
    updatedValue[index] = parsedValue;
    setValue(updatedValue);
  };

  const handleMouseEnter = () => {
    setButtonText(t('hover'));
  };

  const handleMouseLeave = () => {
    setButtonText(t('group')); 
  };

  const handleClick = () => {
    setButtonText(t('hover'));
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };

  const connectToRoom = () => {
    ws.emit('create-room', { peerId: me._id, value, selectedLanguage, selectedGender, userData, userLanguage: user?.language, userGender: user?.gender, userAge: calculateAge(user?.birthday) });
  };

  return (
    <>
      <div className={styles.container}>
        <Image className={styles.mainLogo}
          src={Logo}
          width={80}
          quality={100}
          priority={true}
          alt='Main page image'
        />
        <Image className={styles.mainImage}
          src={MainImg}
          width={108}
          height={79}
          quality={100}
          priority={true}
          alt='Main page image'
        />
        <div className={styles.mainTxt}>{t("title")}</div>

        <div className={styles.customSelectContainer}>
          <GenderSelector onSelectGender={handleGenderChange} userGender={undefined} params={params} />
          <LangSelector onSelectLanguage={handleLanguageChange} userLanguage={undefined} params={params}/>   
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.ageTxt}>{t("age")}</div>

          <ThemeProvider theme={theme}>
            <Box sx={{ 
              '& .MuiSlider-valueLabel': {
                fontSize: 12,
                fontWeight: 'normal',
                backgroundColor: 'unset',
                color: 'white',
              },
              width: 300,
              color: 'primary.main',
              marginTop: '25px'
            }}>
              <Slider
                value={value} 
                onChange={handleChange}
                valueLabelDisplay="on"
                min={14}
                max={99}
                disableSwap
              />
            </Box>
          </ThemeProvider>
        </div>
        
        <div className={styles.inputContainer}>
          <input className={styles.valueInput} type="text" value={value[0]} onChange={(e) => handleInputChange(0, e)} />
          <input className={styles.valueInput} type="text" value={value[1]} onChange={(e) => handleInputChange(1, e)} />
          <button className={styles.buttonOK}>OK</button>
        </div>

        <div className={styles.mainBtnBox}>
          <button className={styles.button1to1} onClick={connectToRoom}>{t("1to1")}</button>
          <button
            className={styles.buttonGroup}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>
        <Navbar/>
      </div>
    </>
  );
}

export default Main;