import React, { useState, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { compose } from "compose-react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { appHeader } from "../../scss/header.module.scss";
import HeaderCountrySection from "./HeaderCountrySection";
import { selectCountryCode } from "../../redux/selectors/newsSelectors";
import { setCountryCode } from "../../redux/actions/newsActions";
import { setActiveClass } from "./HeaderStyleUtils";
import HeaderNavigationMobile from "./HeaderNavigationMobile";
import HeaderNavigationDesktop from "./HeaderNavigationDesktop";
import { NEWS_ARTICLE } from "../../constants/routNames";

const Header = ({ location }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const [headerMenuIsOpen, setHeaderMenuIsOpen] = useState(false);
  const activeCountryCode = useSelector(selectCountryCode);

  const onCountryCodeClick = useCallback(
    (event, code) => {
      if (code !== activeCountryCode) {
        event.preventDefault();
        i18n.changeLanguage(code);
        setActiveClass(event.target);
        dispatch(setCountryCode(code));
      }
    },
    [activeCountryCode, i18n, dispatch]
  );
  const countrySelectionDisabled = location.pathname === NEWS_ARTICLE;

  const toggleHeaderMenu = useCallback(() => {
    setHeaderMenuIsOpen(!headerMenuIsOpen);
  }, [headerMenuIsOpen]);

  return (
    <header className={appHeader}>
      <HeaderNavigationDesktop />
      <HeaderNavigationMobile
        headerMenuIsOpen={headerMenuIsOpen}
        toggleHeaderMenu={toggleHeaderMenu}
      />
      <HeaderCountrySection
        onCountryCodeClick={onCountryCodeClick}
        countrySelectionDisabled={countrySelectionDisabled}
      />
    </header>
  );
};
Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(memo, withRouter)(Header);
