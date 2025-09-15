import React from 'react';
import styled from 'styled-components';

const Button = ({title,fxn}) => {
  return (
    <StyledWrapper>
      <button onClick={fxn} className='font-robo text-3xl border-2 rounded bg-ylo-50 p-1 pr-2'>{title}</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {   
    box-shadow: 0.1em 0.1em;
    cursor: pointer;
  }

  button:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
  }

  button:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em;
  }`;

export default Button;
