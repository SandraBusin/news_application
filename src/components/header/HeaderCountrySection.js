import React from "react";
import PropTypes from "prop-types";

const HeaderCountrySection = ({
  onCountryCodeClick,
  countrySelectionDisabled,
}) => {
  return (
    <>
      <button
        className="headerLangButton activeItem"
        type="button"
        disabled={countrySelectionDisabled}
        onClick={(event) => onCountryCodeClick(event, "gb")}
      >
        GB
      </button>
      <button
        className="headerLangButton"
        type="button"
        disabled={countrySelectionDisabled}
        onClick={(event) => onCountryCodeClick(event, "us")}
      >
        US
      </button>
    </>
  );
};
HeaderCountrySection.propTypes = {
  onCountryCodeClick: PropTypes.func.isRequired,
  countrySelectionDisabled: PropTypes.bool.isRequired,
};

export default HeaderCountrySection;
