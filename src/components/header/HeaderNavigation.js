import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { headerNavList, headerNavMenu } from "../../scss/header.module.scss";
import { HOME, CATEGORIES, SEARCH } from "../../constants/routNames";
import HeaderNavigationLink from "./HeaderNavigationLink";

const HeaderNavigation = ({ closeModal }) => {
  const { t } = useTranslation();
  const onItemClick = typeof closeModal === "function" ? closeModal : () => {};
  return (
    <nav className={headerNavMenu}>
      <ul className={headerNavList}>
        <HeaderNavigationLink
          onItemClick={onItemClick}
          toPath={HOME}
          text={t("header.nav.topNews")}
        />
        <HeaderNavigationLink
          onItemClick={onItemClick}
          toPath={CATEGORIES}
          text={t("header.nav.categories")}
        />
        <HeaderNavigationLink
          onItemClick={onItemClick}
          toPath={SEARCH}
          text={t("header.nav.search")}
        />
      </ul>
    </nav>
  );
};
HeaderNavigation.defaultProps = {
  closeModal: () => {},
};
HeaderNavigation.propTypes = {
  closeModal: PropTypes.func,
};
export default HeaderNavigation;
