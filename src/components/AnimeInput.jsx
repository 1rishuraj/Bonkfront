import React from 'react';
import styled from 'styled-components';

const AnimeInput = ({Type,Place,Val,Fxn,Step=0.1,disabled=false}) => {
    
  return (
    <StyledWrapper>
      <input disabled={disabled} onChange={Fxn} className={`bg-ylo-50 input w-[350px]`} type={Type} placeholder={Place} step={Step} 
      value={Val===0?"":Val}/>
      
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    
    padding: 0.875rem;
    font-size: 1rem;
    border: 1.5px solid #000;
    border-radius: 0.5rem;
    box-shadow: 2.5px 3px 0 #000;
    outline: none;
    transition: ease 0.25s;
  }

  .input:focus {
    box-shadow: 5.5px 7px 0 black;
  }`;

export default AnimeInput;
