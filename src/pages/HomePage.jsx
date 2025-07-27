import Navbar from "../components/UI/Navbar";
import Banner from "../components/UI/Banner";
import RowPost from "../components/UI/RowPost";
import Footer from "../components/UI/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../api/fetchMovies";
import { PropagateLoader } from "react-spinners";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { category } from "../data/category.data";

const HomePage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: ()=>fetchMovies(category.trending.url),
  });
  const [isFetchHasWorstDelay, setIsFetchHasWorstDelay] = useState(false);

  // Category list
  const categoryList = [
    category.trending,
    category.tv,
    category.origin,
    category.fiction,
    category.romance,
    category.action,
    category.horror,
    category.animation,
    category.drama,
    category.comedy,
    category.music,
    category.documentary,
    category.history,
    // ~:~
    // category.adventure,
    // category.crime,
    // category.family,
    // category.fantasy,
    // category.mystery,
    // category.thriller,
    // category.war,
    // category.western,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsFetchHasWorstDelay(true);
      }
    }, 20 * 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="blank-screen">
        <div className="blank-screen__loading">
          <PropagateLoader
            color="rgb(192, 0, 16)"
            loading={isLoading}
            aria-label="Loading Spinner"
            className="blank-screen__loading--indicator"
          />
          {isFetchHasWorstDelay && (
            <p className="blank-screen__loading--message">
              <span>I think we have a slower network</span>
              <span>Please wait...</span>
            </p>
          )}
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className="blank-screen">
        <div className="blank-screen__error">
          <p className="blank-screen__error--code">Error 504</p>
          <p className="blank-screen__error--title">Gateway Timeout</p>
          <p className="blank-screen__error--message">
            The API service (TMDB) used in this application has been blocked by
            your internet provider
          </p>
        </div>
      </div>
    );
  return (
    <>
      <Navbar />
      <Banner movies={movies} />
      <div className="row-post">
        {categoryList.map((cate, i) =>{
          if(i%2 == 0) return <RowPost key={i} category={cate} />
          return <RowPost key={i} category={cate} w_sm/>
        })}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
