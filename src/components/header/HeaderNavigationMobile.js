import React, { memo } from "react";
import FA from "react-fontawesome";
import PropTypes from "prop-types";
import Modal from "react-modal";
import HeaderNavigation from "./HeaderNavigation";
import {
  headerNavigationMobile,
  headerNavigationMobileList,
  headerNavigationMobileOverlay,
} from "../../scss/header.module.scss";

Modal.setAppElement("#root");

const HeaderNavigationMobile = ({ headerMenuIsOpen, toggleHeaderMenu }) => {
  const onToggleClick = () => {
    toggleHeaderMenu();
  };
  return (
    <>
      <button
        type="button"
        onClick={onToggleClick}
        id="toggleMenuBtn"
        className={headerNavigationMobile}
        aria-label="Menu"
      >
        <FA name="align-justify" />
      </button>
      <Modal
        isOpen={headerMenuIsOpen}
        className={headerNavigationMobileList}
        overlayClassName={headerNavigationMobileOverlay}
        shouldCloseOnOverlayClick
        onRequestClose={onToggleClick}
      >
        <HeaderNavigation closeModal={onToggleClick} />
      </Modal>
    </>
  );
};

HeaderNavigationMobile.propTypes = {
  headerMenuIsOpen: PropTypes.bool.isRequired,
  toggleHeaderMenu: PropTypes.func.isRequired,
};

export default memo(HeaderNavigationMobile);
