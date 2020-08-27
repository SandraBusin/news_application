import React from "react";
import PropTypes from "prop-types";
import FA from "react-fontawesome";

const CategorySliderArrow = ({ goTo, arrow, buttonId, isHidden }) => {
  if (isHidden) {
    return <></>;
  }
  return (
    <button
      type="button"
      className="sliderArrow"
      id={buttonId}
      onClick={goTo}
      aria-label="Slide button"
    >
      <FA name={arrow === "next" ? "angle-right" : "angle-left"} />
    </button>
  );
};

CategorySliderArrow.defaultProps = {
  buttonId: "",
  isHidden: false,
};
CategorySliderArrow.propTypes = {
  goTo: PropTypes.func.isRequired,
  arrow: PropTypes.string.isRequired,
  buttonId: PropTypes.string,
  isHidden: PropTypes.bool,
};

export default CategorySliderArrow;
