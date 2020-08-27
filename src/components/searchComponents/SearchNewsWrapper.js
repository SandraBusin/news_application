import React, { useEffect, useState, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import SearchNewsInputField from "./SearchNewsInputField";
import { selectCountryCode } from "../../redux/selectors/newsSelectors";
import { fetchNews } from "../../redux/actions/newsActions";
import NewsListWrapper from "../topNewsComponents/NewsListWrapper";
import CountryNameTitleSection from "../../utils/CountryNameTitleSection";

const SearchNewsWrapper = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const countryCode = useSelector(selectCountryCode);

  const [searchQueryValue, setSearchQueryValue] = useState("");

  const getNews = useCallback(
    (selectedCountryCode, queryValue) => {
      const country = selectedCountryCode || countryCode;
      const query = queryValue || searchQueryValue;
      dispatch(fetchNews(country, query));
    },
    [searchQueryValue, countryCode, dispatch]
  );

  const onSearchInputChange = useCallback(
    (event) => {
      event.preventDefault();
      getNews(countryCode, event.target.value);
      setSearchQueryValue(event.target.value);
    },
    [countryCode, getNews]
  );
  useEffect(() => getNews(countryCode), [getNews, countryCode]);

  return (
    <>
      <h1>
        {t("searchNews.title.beforeCountry")}
        &nbsp;
        <CountryNameTitleSection />
        &nbsp;
        {t("searchNews.title.afterCountry")}
      </h1>
      <SearchNewsInputField
        onSearchInputChange={onSearchInputChange}
        searchQueryValue={searchQueryValue}
      />
      <NewsListWrapper />
    </>
  );
};

export default memo(SearchNewsWrapper);
