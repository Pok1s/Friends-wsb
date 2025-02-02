import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { FaSquareGithub } from 'react-icons/fa6';
import { FaLinkedin, FaBehance, FaDribbble } from 'react-icons/fa';
import { SwipeContainer } from './OurTeam.styled';

import Image from 'next/image';
import member1 from "../../images/our-team/Julia.jpeg";
import member2 from "../../images/our-team/maryna.webp";
import member3 from "../../images/our-team/Khabuzov.webp";
import member4 from "../../images/our-team/NataliFS.webp";
import member6 from "../../images/our-team/Oksana.webp";
import member7 from "../../images/our-team/taras.jpg";
import member8 from "../../images/our-team/Ksenya.webp";
import member9 from "../../images/our-team/NataliBA.jpg";
import member10 from "../../images/our-team/NataliPM.webp";
import defman from "../../images/our-team/defman.jpg";
import defwom from "../../images/our-team/defwom.webp";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px', 
  height: 'auto',
  backgroundColor: 'transparent',
  borderRadius: '24px',
  border: 'none',
  outline: 'none',
  boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.2)', 
  padding: '16px', 
};


interface TeamMember {
    head: string;
    position: string;
    roles: string[];
    image: string;
    linkedin: string;
    git?: string;
    behance?: string;
    dribbble?: string;
  }
  
  const ourTeamBox: { [key: string]: TeamMember } = {
    "1box": {
      head: "Yuliia Milkevych",
      position: "UI/UX Designer",
      roles: [
        "Conducts UX research", "Works with UX attributes", "Develops wireframes", "Develops user interfaces"
      ],
      linkedin: "http://www.linkedin.com/in/julia-milkevych",
      image: member1.src,
      behance: "https://www.behance.net/juliamilkevich"
    },
    "2box": {
      head: "Maryna Perekhrest",
      position: "UI/UX Designer",
      roles: [
        "Conducts user research", "Creates user flows and sitemaps", "Creates wireframes", "Creates interactive prototypes",
      ],
      image: member2.src,
      dribbble: "https://dribbble.com/Perekhrest",
      linkedin: "http://www.linkedin.com/in/maryna-perekhrest-872019a9",
    },
    "3box": {
      head: "Serhii Khabuzov",
      position: "Fullstack Developer",
      roles: [
        "Develops Authorization(Back and Front)", "Develops Conection(Back and Front)", "Develops Ratings(Back and Front), Develops pages(404, Info, SignUp, EditProfile, Main, Rate)",
      ],

      image: member3.src,
      git: "https://github.com/Arag0rn",
      linkedin: "https://www.linkedin.com/in/serhii-khabuzov/",
    },
    "4box": {
      head: "Nataliia Shevchenko",
      position: "Backend Developer",
      roles: [
        "Develops Google authorization(Back)", "Develops Facebook (Back)", "Makes up requests for unregistered users(Back)"
      ],

      image: member4.src,
      git: "https://github.com/TommoBosha",
      linkedin: "https://www.linkedin.com/in/natshevchenko/",
    },
    "5box": {
      head: "Vasyl Borshch",
      position: "Frontend Developer",
      roles: [
        "Develops Google authorization(Front)", "Develops Facebook (Front)", "Develops pages(Notification, Hello, Profile, Conection Page, SignIn)"
      ],

      image: defman.src,
      git: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/vasyl-borshch-061548278/",
    },
    "6box": {
      head: "Oksana Kazanchuk",
      position: "QA (manual/automation)",
      roles: [
        "Plans and executes test cases", "Evaluates the usability and functionality of the app",
      ],

      image: member6.src,
      git: "https://github.com/Ksu0007",
      linkedin: "https://www.linkedin.com/in/oksana-kazanchuk-qa/",
    },
    "7box": {
      head: "Taras Shevchenko",
      position: "Manual QA",
      roles: [
        "Collaborates with other testers and team members to ensure the app meets all requirements"
      ],

      image: member7.src,
      git: "https://github.com/tryamkin",
      linkedin: "https://www.linkedin.com/in/taras-shevchenko-387bb154/",
    },
    "8box": {
      head: "Kseniia Mykhailyk",
      position: "Manual QA",
      roles: [
        "Provides feedback to developers to improve the app's quality"
      ],

      image: member8.src,
      linkedin: "https://www.linkedin.com/in/kseniia-mykhailyk-924980272/",
    },
    "9box": {
      head: "Natali Istomina",
      position: "Bussiness Analist",
      roles: [
        "Gathers user requirements and feedback"
      ],

      image: member9.src,
      linkedin: "https://www.linkedin.com/in/natali-istomina/",
    },
    "10box": {
      head: "Natalya Gayvanovych",
      position: "Project Manager",
      roles: [
        "Defines project scope and objective, Monitors and controls project performance"
      ],

      image: member10.src,
      linkedin: "https://www.linkedin.com/in/natalya-gayvanovych/",
    },

  };

  export default function OurTeam({ onClose, openModal }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      onClose(); 
    };
 

  return (
    <Modal
    open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
      <SwipeContainer style={{ backgroundColor: 'transparent' }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: -100,
            depth: 500,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
{Object.keys(ourTeamBox).map((boxKey, index) => {
            const box = ourTeamBox[boxKey];
            return (
              <SwiperSlide key={index} className="swiper-slide">
                                 
                <div className="team-box box-1" style={{
                    backgroundImage: `url(${box.image})`,
                    backgroundColor: 'transparent',
                  }}
                >
                  <div className="team-name">
                    <div className="team-respons">
                      <h3>Roles and Responsibilities</h3>
                      <ul>
                        {box.roles.map((role, index) => (
                          <li key={index}>{role}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="team-content">
                      <h2>{box.head}</h2>
                      <p>{box.position}</p>
                      <div className="team-icon-wrapper">
                      {box.git && (
                          <a className="team-link" href={box.git} target="_blank" rel="noopener noreferrer">
                            <FaSquareGithub className="icon logo-github" />
                          </a>
                        )}
                        {box.behance && (
                          <a className="team-link" href={box.behance} target="_blank" rel="noopener noreferrer">
                            <FaBehance className="icon logo-behance" />
                          </a>
                        )}
                        {box.dribbble && (
                          <a className="team-link" href={box.dribbble} target="_blank" rel="noopener noreferrer">
                            <FaDribbble className="icon logo-dribbble" />
                          </a>
                        )}
                        <a className="team-link"
                          href={box.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin className="icon logo-linkedin " />
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            );
          })}
         
        </Swiper>
      </SwipeContainer>
    </Box>
    </Modal>
  );
};
