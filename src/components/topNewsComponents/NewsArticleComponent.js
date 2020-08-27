import React from "react";
import PropTypes from "prop-types";
import FA from "react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  newsArticleContent,
  newsArticleWrapper,
  articleBackButton,
} from "../../scss/news.module.scss";
import NewsArticleImage from "./NewsArticleImage";

const NewsArticleComponent = ({ location, history }) => {
  const { t } = useTranslation();
  let title = "";
  let urlToImage = "";
  let content = "";
  if (location && location.state) {
    const locationState = location.state;
    title = locationState.title || "";
    urlToImage = locationState.urlToImage || "";
    content = locationState.content || "";
    content = content.replace("↵", "\n");
  }
  const onGoBackClick = () => {
    history.goBack();
  };

  return (
    <article className={newsArticleWrapper}>
      <h1>{title}</h1>
      <NewsArticleImage urlToImage={urlToImage} />
      <p className={newsArticleContent}>{content}</p>
      <button
        type="button"
        onClick={onGoBackClick}
        className={articleBackButton}
      >
        <FA name="angle-left" />
        {t("article.button.back")}
      </button>
    </article>
  );
};

NewsArticleComponent.defaultProps = {
  location: {
    state: {
      title: "",
      urlToImage: "",
      content: "",
    },
  },
};
NewsArticleComponent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string,
      urlToImage: PropTypes.string,
      content: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewsArticleComponent;
