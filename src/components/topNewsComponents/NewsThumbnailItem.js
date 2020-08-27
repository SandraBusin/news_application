import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import FA from "react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  newsThumbnailWrapper,
  newsThumbnailLink,
} from "../../scss/news.module.scss";
import { NEWS_ARTICLE } from "../../constants/routNames";
import NewsArticleImage from "./NewsArticleImage";

const NewsThumbnailItem = ({
  title = "",
  urlToImage = "",
  description = "",
  content = "",
}) => {
  const { t } = useTranslation();
  return (
    <article className={newsThumbnailWrapper}>
      <h2>{title}</h2>
      <NewsArticleImage urlToImage={urlToImage} />
      <p>{description}</p>
      <NavLink
        className={newsThumbnailLink}
        to={{
          pathname: NEWS_ARTICLE,
          state: {
            title,
            urlToImage,
            content,
          },
        }}
      >
        {t("news.thumbnail.button.more")}
        <FA name="angle-right" />
      </NavLink>
    </article>
  );
};

NewsThumbnailItem.defaultProps = {
  title: "",
  urlToImage: "",
  description: "",
  content: "",
};
NewsThumbnailItem.propTypes = {
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
};

export default NewsThumbnailItem;
