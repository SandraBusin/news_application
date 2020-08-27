import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectCountryCode } from "../redux/selectors/newsSelectors";

const CountryNameTitleSection = () => {
  const countryCode = useSelector(selectCountryCode);
  const { t } = useTranslation();
  return <>{t(countryCode)}</>;
};

export default CountryNameTitleSection;
