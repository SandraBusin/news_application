import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectCountryCode } from "../../redux/selectors/newsSelectors";
import { fetchNews } from "../../redux/actions/newsActions";
import NewsListWrapper from "../topNewsComponents/NewsListWrapper";
import { categoryListTitle } from "../../scss/newsCategories.module.scss";
import CountryNameTitleSection from "../../utils/CountryNameTitleSection";

const NewsByCategoryContainer = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countryCode = useSelector(selectCountryCode);
  useEffect(() => dispatch(fetchNews(countryCode, "", match.params.category)), [
    countryCode,
    match.params.category,
    dispatch,
  ]);

  return (
    <>
      <h1 className={categoryListTitle}>
        {t("category.title.beforeCategory")}
        &nbsp;
        {match.params.category}
        &nbsp;
        {t("category.title.afterCategory")}
        &nbsp;
        <CountryNameTitleSection />
      </h1>
      <NewsListWrapper />
    </>
  );
};
NewsByCategoryContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
    }),
  }).isRequired,
};

export default memo(NewsByCategoryContainer);
