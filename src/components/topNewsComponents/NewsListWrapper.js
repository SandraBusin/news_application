import React, { memo } from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NewsThumbnailItem from "./NewsThumbnailItem";
import { newsListWrapper } from "../../scss/news.module.scss";
import {
  selectNewsList,
  selectNewsListError,
} from "../../redux/selectors/newsSelectors";

const NewsListWrapper = () => {
  const { t } = useTranslation();
  const newsList = useSelector(selectNewsList);
  const newsError = useSelector(selectNewsListError);
  let keyIndex = 0;
  if (newsError) {
    return <p>{t("error.networkError")}</p>;
  }
  if (newsList.length === 0) {
    return <p>{t("error.noData")}</p>;
  }
  return (
    <section className={newsListWrapper}>
      {newsList.map((item) => {
        keyIndex += window.location.pathname;
        return (
          <NewsThumbnailItem
            key={`${item.publishedAt}${keyIndex}`}
            title={item.title}
            urlToImage={item.urlToImage}
            description={item.description}
            content={item.content}
          />
        );
      })}
    </section>
  );
};

export default memo(NewsListWrapper);
