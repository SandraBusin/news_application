import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  headerNavListItem,
  headerNavActiveItem,
  headerNavItemLink,
} from "../../scss/header.module.scss";

const HeaderNavigationLink = ({ onItemClick, toPath, text }) => {
  return (
    <li className={headerNavListItem}>
      <NavLink
        onClick={onItemClick}
        className={headerNavItemLink}
        activeClassName={headerNavActiveItem}
        exact
        to={toPath}
      >
        {text}
      </NavLink>
    </li>
  );
};
HeaderNavigationLink.defaultProps = {
  onItemClick: () => {},
  text: "",
  toPath: "",
};

HeaderNavigationLink.propTypes = {
  onItemClick: PropTypes.func,
  text: PropTypes.string,
  toPath: PropTypes.string,
};

export default HeaderNavigationLink;
