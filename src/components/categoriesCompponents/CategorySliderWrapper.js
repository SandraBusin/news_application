import React, { useCallback, useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import FA from "react-fontawesome";
import useEvent from "use-add-event";
import { useTranslation } from "react-i18next";
import { selectCountryCode } from "../../redux/selectors/newsSelectors";
import CategorySliderArrow from "./CategorySliderArrow";
import NewsSliderItemsWrapper from "./NewsSliderItemsWrapper";
import {
  categoryTitle,
  newsSlider,
  collapsedCategory,
  newsCategoryCollapseBtn,
  categoryTitleLink,
} from "../../scss/newsCategories.module.scss";
import {
  NEWS_API_TOP_HEADLINES,
  DEFAULT_API_HEADER,
} from "../../constants/urls";

const CategorySliderWrapper = ({ categoryName }) => {
  const { t } = useTranslation();
  const initialNewsItemsListLength = Math.floor(window.innerWidth / 360);

  const [newsItemsListLength, setNewsItemsListLength] = useState(
    initialNewsItemsListLength
  );

  const countryCode = useSelector(selectCountryCode);

  const [news, setNews] = useState({ newsList: [], newsListLength: 0 });

  const [newsListError, setNewsListError] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getNewsByCategory = useCallback(() => {
    Axios({
      url: NEWS_API_TOP_HEADLINES,
      method: "get",
      headers: DEFAULT_API_HEADER,
      params: { country: countryCode, category: categoryName },
    })
      .then((response) => {
        const topNews = response.data.articles.slice(0, 5);
        setNews({
          newsList: topNews,
          newsListLength: topNews.length,
        });
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        setNewsListError(errorMessage);
      });
  }, [countryCode, categoryName]);

  useEffect(() => getNewsByCategory(), [categoryName, getNewsByCategory]);

  const hideCarousellButton = useCallback(
    (direction, hideButton) => {
      const button = document.getElementById(
        `${categoryName}_${direction}ButtonId`
      );

      if (button) {
        button.classList.toggle("hiddenSliderArrowButton", hideButton);
      }
    },
    [categoryName]
  );

  const hideAllCarousellItemsForCategory = () => {
    const elements = document.getElementsByClassName(`${categoryName}NewsItem`);

    const carousellItemsKeys = Object.keys(elements);
    let elementIndex = 0;
    let newsItem = null;
    for (let index = 0; index < carousellItemsKeys.length; index += 1) {
      elementIndex = carousellItemsKeys[index];
      newsItem = elements[elementIndex];
      if (newsItem && newsItem.classList.contains("activeNewsItem")) {
        newsItem.classList.remove("activeNewsItem");
      }
    }
  };
  const hideOverflownCarousellItems = () => {
    let newsItemIndex = 0;
    let element = null;
    hideAllCarousellItemsForCategory();
    for (
      newsItemIndex = 0;
      newsItemIndex < newsItemsListLength;
      newsItemIndex += 1
    ) {
      element = document.getElementById(`${categoryName}_${newsItemIndex}_id`);
      if (element) {
        element.classList.add("activeNewsItem");
      }
    }
    hideCarousellButton("prev", true);

    if (newsItemsListLength === 5) {
      hideCarousellButton("next", true);
    } else {
      hideCarousellButton("next", false);
    }
  };

  useEffect(() => {
    hideOverflownCarousellItems();
  });

  const handleResize = () => {
    const newNewsItemsListLength = Math.floor(window.innerWidth / 360);
    setNewsItemsListLength(newNewsItemsListLength);
    hideOverflownCarousellItems();
  };

  useEvent("resize", handleResize);

  const returnVisibleNewsItems = useCallback(() => {
    const visibleNews = document.getElementsByClassName("activeNewsItem");
    const visibleNewsKeys = Object.keys(visibleNews);
    const activeCategoryNews = [];

    for (let index = 0; index < visibleNewsKeys.length; index += 1) {
      const elementIndex = visibleNewsKeys[index];
      const newsItem = visibleNews[elementIndex];
      if (newsItem.id.includes(categoryName)) {
        activeCategoryNews.push(newsItem);
      }
    }
    return activeCategoryNews;
  }, [categoryName]);

  const toggleActiveNewsItemClass = useCallback(
    (addElementIndex, hideElementInde) => {
      const addElement = document.getElementById(
        `${categoryName}_${addElementIndex}_id`
      );

      const hideElement = document.getElementById(
        `${categoryName}_${hideElementInde}_id`
      );

      if (hideElement) {
        hideElement.classList.remove("activeNewsItem");
      }
      if (addElement) {
        addElement.classList.add("activeNewsItem");
      }
    },
    [categoryName]
  );

  const returnItemIndex = (item) => {
    const itemToReturn = item;
    const itemIndexToReturn = Number(itemToReturn.id.split("_")[1]);
    return itemIndexToReturn;
  };
  const goToPreviousNews = useCallback(() => {
    const activeCategoryNews = returnVisibleNewsItems();

    const firstVisibleItemIndex = returnItemIndex(activeCategoryNews[0]);

    const lastNewsVisibleIndex = returnItemIndex(
      activeCategoryNews[activeCategoryNews.length - 1]
    );

    const newVisibleItemIndex = firstVisibleItemIndex - 1;

    if (newVisibleItemIndex === 0) {
      hideCarousellButton("prev", true);
    }

    if (lastNewsVisibleIndex === 4) {
      hideCarousellButton("next", false);
    }

    toggleActiveNewsItemClass(newVisibleItemIndex, lastNewsVisibleIndex);
  }, [returnVisibleNewsItems, hideCarousellButton, toggleActiveNewsItemClass]);

  const goToNextNews = useCallback(() => {
    const activeCategoryNews = returnVisibleNewsItems();

    const lastNewsVisibleIndex = returnItemIndex(
      activeCategoryNews[activeCategoryNews.length - 1]
    );

    const newsIndexToHide = returnItemIndex(activeCategoryNews[0]);

    const newLastIndex = lastNewsVisibleIndex + 1;

    if (newLastIndex === 4) {
      hideCarousellButton("next", true);
    }
    if (newsIndexToHide === 0) {
      hideCarousellButton("prev", false);
    }

    toggleActiveNewsItemClass(newLastIndex, newsIndexToHide);
  }, [returnVisibleNewsItems, hideCarousellButton, toggleActiveNewsItemClass]);

  const onColapseButtonClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <span className={categoryTitle}>
        <h2>
          <NavLink
            to={`/categories/${categoryName}`}
            className={categoryTitleLink}
          >
            {t(categoryName)}
          </NavLink>
        </h2>
        <button
          type="button"
          onClick={onColapseButtonClick}
          className={newsCategoryCollapseBtn}
          aria-label="collapse"
        >
          <FA name={isCollapsed ? "angle-down" : "angle-up"} />
        </button>
      </span>
      <div className={isCollapsed ? collapsedCategory : newsSlider}>
        <CategorySliderArrow
          goTo={goToPreviousNews}
          arrow="prev"
          isHidden={false}
          buttonId={`${categoryName}_prevButtonId`}
        />
        <NewsSliderItemsWrapper
          newsList={news.newsList}
          newsListError={newsListError}
          category={categoryName}
        />
        <CategorySliderArrow
          goTo={goToNextNews}
          arrow="next"
          isHidden={false}
          buttonId={`${categoryName}_nextButtonId`}
        />
      </div>
    </>
  );
};

CategorySliderWrapper.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default memo(CategorySliderWrapper);
