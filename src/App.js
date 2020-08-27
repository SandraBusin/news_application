import React, { Suspense, lazy } from "react";
import "./App.css";

import { HashRouter as Router, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "./components/header/Header";
import { HOME, CATEGORIES, SEARCH, NEWS_ARTICLE } from "./constants/routNames";

const TopNewsContainer = lazy(() =>
  import("./components/topNewsComponents/TopNewsContainer")
);
const CategoryListContainer = lazy(() =>
  import("./components/categoriesCompponents/CategoryListContainer")
);
const NewsByCategoryContainer = lazy(() =>
  import("./components/categoriesCompponents/NewsByCategoryContainer")
);
const SearchNewsWrapper = lazy(() =>
  import("./components/searchComponents/SearchNewsWrapper")
);
const NewsArticleComponent = lazy(() =>
  import("./components/topNewsComponents/NewsArticleComponent")
);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Suspense
            fallback={
              <Loader type="ThreeDots" color="#434343" height={80} width={80} />
            }
          >
            <Route exact path={HOME} component={TopNewsContainer} />
            <Route
              path={`${CATEGORIES}/:category`}
              component={NewsByCategoryContainer}
            />
            <Route exact path={CATEGORIES} component={CategoryListContainer} />

            <Route path={SEARCH} component={SearchNewsWrapper} />
            <Route path={NEWS_ARTICLE} component={NewsArticleComponent} />
          </Suspense>
        </main>
      </Router>
    </div>
  );
}

export default App;
