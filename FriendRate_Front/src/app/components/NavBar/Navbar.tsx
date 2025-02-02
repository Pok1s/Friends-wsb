"use client"
import React from 'react'
import styles from "./navbar.module.scss"; 
import { usePathname } from 'next/navigation';
import Link from 'next/link';
interface NavbarProps {
  style?: React.CSSProperties;
}

const Navbar: React.FC<NavbarProps> = ({ style }) => {
    const pathname = usePathname()
    const match = pathname?.match(/\/[a-z]+\/(.+)/);
    
  return (
    <div className={styles.navbar} style={style}>
        <Link href="/main">
          <svg className={match?.includes("main") ? styles.active : styles.notActive } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="ic:baseline-home">
          <path id="Vector" d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" />
          </g>
          </svg>
        </Link>

        <Link href="/rate">
          <svg className={match?.includes('rate') ? styles.active : styles.notActive } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        </Link>

        <Link href="/profile">
          <svg className={match?.includes('profile') || match?.includes('profile-edit') ? styles.active : styles.notActive } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM19 19H5V18.77C5 18.15 5.28 17.57 5.76 17.19C7.47 15.82 9.64 15 12 15C14.36 15 16.53 15.82 18.24 17.19C18.72 17.57 19 18.16 19 18.77V19Z" />
          </svg>
        </Link>
    </div>
  )
}

export default Navbar;
