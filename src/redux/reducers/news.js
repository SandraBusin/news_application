import { SET_NEWS, SET_NEWS_ERROR, SET_COUNTRY_CODE } from "../actionTypes";
import { initialState } from "./initialState";

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NEWS: {
      const { newsList } = action.payload;
      return {
        ...state,
        newsList,
      };
    }
    case SET_NEWS_ERROR: {
      const { newsError } = action.payload;
      return {
        ...state,
        newsError,
      };
    }
    case SET_COUNTRY_CODE: {
      const { countryCode } = action.payload;
      return {
        ...state,
        countryCode,
      };
    }
    default:
      return state;
  }
}
