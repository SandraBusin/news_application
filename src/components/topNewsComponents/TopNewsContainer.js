import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectCountryCode } from "../../redux/selectors/newsSelectors";
import { fetchNews } from "../../redux/actions/newsActions";
import NewsListWrapper from "./NewsListWrapper";
import CountryNameTitleSection from "../../utils/CountryNameTitleSection";

const TopNewsContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countryCode = useSelector(selectCountryCode);
  useEffect(() => dispatch(fetchNews(countryCode)), [countryCode, dispatch]);
  return (
    <>
      <h1>
        {t("topNews.title.beforeCountry")}
        &nbsp;
        <CountryNameTitleSection />
        &nbsp;
      </h1>
      <NewsListWrapper />
    </>
  );
};

export default TopNewsContainer;
