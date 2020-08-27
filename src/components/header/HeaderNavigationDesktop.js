import React from "react";
import HeaderNavigation from "./HeaderNavigation";
import { headerNavigationDesktop } from "../../scss/header.module.scss";

const HeaderNavigationDesktop = () => {
  return (
    <div className={headerNavigationDesktop}>
      <HeaderNavigation />
    </div>
  );
};

export default HeaderNavigationDesktop;
