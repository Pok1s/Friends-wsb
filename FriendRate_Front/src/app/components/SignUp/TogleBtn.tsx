"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from "./SignUp.module.scss"; 
import Link from 'next/link';


const TogleBtn = () => {

    const [activeButton, setActiveButton] = useState<string>('SIGN UP');


    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
      };
    


      return (
        <div className={styles.btnBox}>
      
            <>
              <Link href="/signup"
                  className={`${activeButton === 'SIGN UP' ? styles.smallButton1 : styles.secondaryButton}`}
                  onClick={() => handleButtonClick('SIGN UP')}
                  >
                  SIGN UP
          
              </Link>
              <Link href="/sign-in"
                  className={`${activeButton === 'SIGN IN' ? styles.smallButton2 : styles.secondaryButton2}`}
                  onClick={() => handleButtonClick('SIGN IN')}
                >
                  SIGN IN
  
              </Link>
            </>

        </div>
      );
}

export default TogleBtn