import Axios from "axios";
import { SET_NEWS, SET_NEWS_ERROR, SET_COUNTRY_CODE } from "../actionTypes";
import {
  NEWS_API_TOP_HEADLINES,
  DEFAULT_API_HEADER,
} from "../../constants/urls";

export const setNews = (newsList) => ({
  type: SET_NEWS,
  payload: {
    newsList,
  },
});

export const setNewsError = (newsError) => ({
  type: SET_NEWS_ERROR,
  payload: {
    newsError,
  },
});

export const setCountryCode = (countryCode) => ({
  type: SET_COUNTRY_CODE,
  payload: {
    countryCode,
  },
});

export function fetchNews(countryCode, searchQuery, selectedCategory) {
  return (dispatch) => {
    const query = searchQuery || "";
    const category = selectedCategory || "";
    Axios({
      url: NEWS_API_TOP_HEADLINES,
      method: "get",
      headers: DEFAULT_API_HEADER,
      params: { country: countryCode, q: query, category },
    })
      .then((response) => {
        // handle success
        dispatch(setNews(response.data.articles));
        dispatch(setNewsError(""));
      })
      .catch((error) => {
        // handle error
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        dispatch(setNewsError(errorMessage));
        dispatch(setNews([]));
      });
  };
}
