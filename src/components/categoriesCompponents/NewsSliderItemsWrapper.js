import React, { memo } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import NewsThumbnailItem from "../topNewsComponents/NewsThumbnailItem";
import { newsSliderListWrapper } from "../../scss/news.module.scss";

const NewsSliderItemsWrapper = ({ newsList, newsListError, category }) => {
  const { t } = useTranslation();

  let key = "";
  if (newsListError) {
    return <div className="errorMessageItem">{newsListError}</div>;
  }
  if (newsList.length === 0) {
    return <p>{t("error.noData")}</p>;
  }
  return (
    <section className={newsSliderListWrapper}>
      {newsList &&
        newsList.map((item, index) => {
          key = item.publishedAt + window.location.pathname + index;
          return (
            <article
              className={`hiddenNewsItem ${category}NewsItem`}
              key={key}
              id={`${category}_${index}_id`}
            >
              <NewsThumbnailItem
                key={`${item.publishedAt}${window.location.pathname}`}
                title={item.title}
                urlToImage={item.urlToImage}
                description={item.description}
                content={item.content}
              />
            </article>
          );
        })}
    </section>
  );
};
NewsSliderItemsWrapper.defaultProps = {
  newsListError: "",
  category: "",
};
NewsSliderItemsWrapper.propTypes = {
  newsList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      urlToImage: PropTypes.string,
      description: PropTypes.string,
      content: PropTypes.string,
    })
  ).isRequired,
  newsListError: PropTypes.string,
  category: PropTypes.string,
};

export default memo(NewsSliderItemsWrapper);
