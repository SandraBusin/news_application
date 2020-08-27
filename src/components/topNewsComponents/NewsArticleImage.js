import React from "react";
import PropTypes from "prop-types";
import {
  newsThumbnailImg,
  newsThumbnailImgPlaceholder,
} from "../../scss/news.module.scss";

const NewsArticleImage = ({ urlToImage }) => {
  return (
    <>
      {urlToImage ? (
        <img src={urlToImage} alt="news" className={newsThumbnailImg} />
      ) : (
        <div className={newsThumbnailImgPlaceholder} />
      )}
    </>
  );
};

NewsArticleImage.defaultProps = {
  urlToImage: "",
};
NewsArticleImage.propTypes = {
  urlToImage: PropTypes.string,
};
export default NewsArticleImage;
