import React from "react";
import logo from "../../assets/logo.png";
import style from "./style.module.scss";

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.header__right}>
        <img src={logo} alt="logo.png" className={style.header__logo} />
        <div className={style.header__item}>
          <a href="">Find jobs</a>
        </div>
        <div className={style.header__item}>
          <a href="">Company review</a>
        </div>
      </div>
      <div className={style.header__right}>
        <div className={style.header__item}>
          <a href="">Create your CV</a>
        </div>
        <div className={style.header__item}>
          <a href="">Sign in</a>
        </div>
        <span className={style.header__span}></span>
        <div className={style.header__item}>
          <a href="">Employers / Post Job</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
