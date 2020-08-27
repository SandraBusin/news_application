import React from "react";
import { useTranslation } from "react-i18next";
import CategorySliderWrapper from "./CategorySliderWrapper";
import CountryNameTitleSection from "../../utils/CountryNameTitleSection";
import { categoriesNewsSectionWrapper } from "../../scss/newsCategories.module.scss";

const categoryList = [
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];
const CategoryListContainer = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>
        {t("categories.title")}
        &nbsp;
        <CountryNameTitleSection />
      </h1>
      <section className={categoriesNewsSectionWrapper}>
        {categoryList.map((category, index) => {
          return (
            <CategorySliderWrapper
              key={category}
              categoryName={category}
              categoryIndex={index}
            />
          );
        })}
      </section>
    </>
  );
};

export default CategoryListContainer;
