import React from 'react';
import styled from 'styled-components';

const Card = ({ children, bg, title, img, ht = "h-[190px]" }) => {
  return (
    <StyledWrapper>
      <div className={`card wrapper ${bg} ${ht}`}>
        <div className={`head flex gap-1 items-center font-medium text-2xl bg-ylo-50 `}>{title}{img && <img className="h-5 w-5 object-cover" src={img} ></img>}</div>
        <div className={`content text-xl`}>
          {children}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
.wrapper {
    --input-focus: #43aa91;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
      /* display: flex; */
      /* flex-direction: column; */
      /* align-items: center; */
  }
  .card {
    
    translate: -6px -6px;
    border: 2px solid #000000;
    box-shadow: 4px 4px 0 #000000;
    overflow: hidden;
    transition: all 0.3s ease;
    border-radius:5px;
  }

  .head {
    width: 100%;
    
    padding: 5px 12px;
    color: #000000;
    border-bottom: 3px solid #000000;
  }

  .content {
    padding: 8px 12px;
    
  }

  .button {
    width: 150px;
    height: 60px;
    border-radius: 5px;
    border: 2px solid #323232;
   
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

  .button:hover:active, .button-confirm:hover:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

    .button:hover {
 
    color: white; /* text color change */
    transform: translate(-2px, -2px); /* slight lift effect */
    box-shadow: 6px 6px var(--main-color); /* bigger shadow */
    transition: all 0.2s ease; /* smooth animation */
    }
    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      box-shadow: 4px 4px #aaa; /* muted shadow */
      transform: none;          /* no transform */
      color: #888;              /* faded text */
    }

    /* Prevent hover effects when disabled */
    .button:disabled:hover,
    .button:disabled:active {
      color: #888;
      box-shadow: 4px 4px #aaa;
      transform: none;
    }


    .card:hover {
    transform: translate(-2px, -2px); /* slight lift effect */
    box-shadow: 6px 6px var(--main-color); /* bigger shadow */
    transition: all 0.2s ease; /* smooth animation */
    }

  `;

export default Card;
