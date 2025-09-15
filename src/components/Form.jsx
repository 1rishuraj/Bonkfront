import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import styled from 'styled-components';
import { pkeyatom } from '../store/src/atoms/pkey';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Form = () => {
  const nav = useNavigate()
  const [pkey, setpkey] = useAtom(pkeyatom)
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  const [lmail, setlmail] = useState("");
  const [lpass, setlpass] = useState("");
  async function sfxn() {
    if (name.length == 0 || mail.length == 0 || pass.length == 0) {
      toast.error("Please fill in all fields.")
      return;
    }
    try {
      const res = await axios.post('https://bonkback.vercel.app/signup', {
        name,
        email: mail,
        password: pass
      })
      if (res.data.publickey) {
        setpkey(res.data.publickey)
        let chk = document.getElementsByClassName("toggle");
        chk[0].checked = false
        console.log(res.data.publickey)
        toast.success("Signup successful")
        setname("")
        setmail("")
        setpass("")
      } else {
        if (res.data == "Email already exists.") {
          toast.error(res.data)
        }
        else
          toast.error("Incorrect details")
        console.log(res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  async function lfxn() {
    if (lmail.length == 0 || lpass.length == 0) {
      toast.error("Please fill in all credentials.")
      return;
    }
    try {
      const res = await axios.post('https://bonkback.vercel.app/signin', {
        email: lmail,
        password: lpass
      })
      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem("token", token)
        setpkey(res.data.publickey)
        console.log(pkey)
        localStorage.setItem("pkey", res.data.publickey)
        toast.success("Login successful")
        nav("/dashboard")

      } else {
        toast.error("Incorrect Credentials")
        console.log(res.data)
      }
    } catch (e) {
      console.error(e);
    }

  }
  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="card-switch ">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider h-8 w-15 ml-20" />
            <span className="card-side" />
            <div className="flip-card__inner mt-8 ">
              <div className="flip-card__front w-120 ">
                <div className="title"><h1 className='text-5xl'>Log in</h1></div>
                <form onSubmit={(e) => {
                  e.preventDefault(); // stop page reload so that opulated values reflect in function call
                  lfxn()
                }} className="flip-card__form bg-[#fefbeb]" >
                  <input onChange={(e) => setlmail(e.target.value)} value={lmail} className="flip-card__input" name="email" placeholder="Email" type="email" />
                  <input onChange={(e) => setlpass(e.target.value)} value={lpass} className="flip-card__input" name="password" placeholder="Password" type="password" />
                  <button type='submit' className="flip-card__btn"><h1 className='text-[20px] font-bold'>Let`s go!</h1></button>
                </form>
              </div>

              <div className="flip-card__back ">
                <div className="title"><h1 className='text-5xl'>Sign up</h1></div>
                <form onSubmit={(e) => {
                  e.preventDefault(); // stop page reload
                  sfxn()
                }} className="flip-card__form bg-[#fefbeb]" >
                  <input onChange={(e) => setname(e.target.value)} value={name} className="flip-card__input" placeholder="Name" type="name" />
                  <input onChange={(e) => setmail(e.target.value)} value={mail} className="flip-card__input" name="email" placeholder="Email" type="email" />
                  <input onChange={(e) => setpass(e.target.value)} value={pass} className="flip-card__input" name="password" placeholder="Password" type="password" />
                  <button type='submit' className="flip-card__btn active:shadow-[0px_0px_theme('colors.main')] active:translate-x-[3px] active:translate-y-[3px]"><h1 className='text-[20px] font-bold'>Confirm</h1></button>
                </form>
              </div>
            </div>
          </label>
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
  /* switch card */
  .switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: 'Log in';
    left: 15px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 700;
    opacity: 0.7;
  }

  .card-side::after {
    position: absolute;
    content: 'Sign up';
    left: 160px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 700;
    opacity: 0.8;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-colorcolor);
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 30px;
    width: 30px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }
  .toggle:not(:checked) ~ .card-side:before {
    opacity: 1;
    text-decoration: underline;
  }

  .toggle:checked ~ .card-side:after {
    opacity: 1;
    text-decoration: underline;
  }

  /* card */ 

  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
      /* width: 100%;
      height: 100%; */
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .toggle:checked ~ .flip-card__front {
    box-shadow: none;
  }

  .flip-card__front, .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background:#fefbeb;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    width: 480px;
    right: 10px;
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 400px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 20px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn:hover:active, .button-confirm:hover:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

.flip-card__btn:hover {
  background-color: var(--input-focus); /* change bg color on hover */
  color: white; /* text color change */
  transform: translate(-2px, -2px); /* slight lift effect */
  box-shadow: 6px 6px var(--main-color); /* bigger shadow */
  transition: all 0.2s ease; /* smooth animation */
}

  .flip-card__btn {
    margin: 20px 0 20px 0;
    width: 150px;
    height: 60px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
   
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }`;

export default Form;
