import React, { memo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { searchNewsInput } from "../../scss/news.module.scss";

const SearchNewsInputField = ({ onSearchInputChange, searchQueryValue }) => {
  const { t } = useTranslation();
  return (
    <input
      name="searchQuery"
      type="search"
      value={searchQueryValue}
      onChange={onSearchInputChange}
      placeholder={t("searchNews.input.placeholder")}
      className={searchNewsInput}
      aria-label="Search term"
    />
  );
};

SearchNewsInputField.propTypes = {
  onSearchInputChange: PropTypes.func.isRequired,
  searchQueryValue: PropTypes.string.isRequired,
};
export default memo(SearchNewsInputField);
