import styled from 'styled-components';


export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const SwipeContainer = styled.div`
  .mySwiper {
    width: 100%;
 padding: 50px 10px;
 background-color:transparent;
  }
  .swiper-wrapper{
    background-color:transparent;
  }
  .swiper-slide-shadow-right{
    background-color:transparent;
  }
  .swiper-slide-shadow-left{
    background-color:transparent;
  }
  .swiper-pagination{
    background-color:transparent;
    
  }
  .swiper-pagination-bullet{
    background: wheat;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 280px;
    height: 400;
    background-color:transparent;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  .team-box {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 400px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white; 
  background-color:transparent;
}
  .team-name {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px;
    flex-direction:column;
    justify-content: space-between;
    position: relative;
    background-color:transparent;
  }

  .team-name:hover,
  .team-name:focus {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.2);
  }

  .team-link{
    background-color:transparent;
  }

  .team-respons {
    transition: all 0.3s;
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    color: white;
    transform: scale(0);
    background-color:transparent;
  }
  .swiper-slide:hover .team-respons,
  .swiper-slide:focus .team-respons {
    transform: scale(1);
  }
  .team-respons h3 {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    background-color:transparent;
  }

  .team-respons ul {
    margin-top: 20px;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color:transparent;
  }

  .team-respons li {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.25;
    position: relative;
    padding-left: 10px;
    background-color:transparent;

    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .team-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    justify-content: center;
    width: 100%;
    height: auto;
    opacity: 0;
    background-color:transparent;
    text-align: center;
  }
  .team-content h2 {
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    background-color:transparent;
  }
  .team-content p {
    color: white;
    font-size: 16px;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
    background-color:transparent;
  }

  .swiper-slide:hover .team-content,
  .swiper-slide:focus .team-content {
    opacity: 1;
  }

  .team-icon-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 10px;
    justify-content: center;
    background-color:transparent;
  }
  .icon {
    position: relative;
    font-size: 50px;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    
  }

  .logo-linkedin {
    color: #407BFF;

  }
  .logo-linkedin:hover,
  .logo-linkedin:focus {
    background-color: #407BFF;
    color: white;
    opacity: 0.5;
  }

  .logo-behance{
    color: #407BFF;
    padding: 4px;
  }

  .logo-behance:hover, 
  .logo-behance:focus{
    background-color: #407BFF;
    color: white;
    opacity: 0.5;
  }

  .logo-dribbble{
      background-color: #ea4c89 ;
      padding: 4px;
  }

  .logo-dribbble:hover{
      background-color: white ;
      color: #ea4c89;
      opacity: 0.5;
  }

  .logo-github {
    color: black;
  }
  .logo-github:hover,
  .logo-github:focus {
    background-color: black;
    color: white;
  }

`;