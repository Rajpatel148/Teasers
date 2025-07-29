import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails, fetchSearchResults } from "../api/fetchMovies";
import "./SearchResultPage.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const SearchResultPage = () => {
  const navigate = useNavigate();
  const { query, page } = useParams();
  const pageLimit = 20;
  let [pageNo, setPageNo] = useState(1);

  const { data: searchData, isLoading } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => fetchSearchResults(query, page),
  });

  useEffect(() => {
    setPageNo(page);
  }, [page]);
  const handleClick = async (movie) => {
    sessionStorage.setItem(
      "enteaser_temp_details",
      JSON.stringify(await fetchMovieDetails(movie))
    );
    navigate("/details");
  };

  const handlePage = (nextPrev) => {
    let newPage = Number(page);
    if (nextPrev === "prev" && newPage > 1) {
      newPage = newPage - 1;
    }
    if (nextPrev === "next" && newPage < pageLimit) {
      newPage = newPage + 1;
    }
    navigate(`/search/${query}/${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageNo(newPage);
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="category">
          <PropagateLoader
            color="rgb(192, 0, 16)"
            loading={isLoading}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <div className="searchResult">
          <h1 className="searchResult-title">
            Results : <span>{query}</span>
          </h1>
          <div className="searchResult-list">
            {searchData?.results?.length > 0 ? (
              searchData.results.map((movie) => (
                <div
                  key={movie.id}
                  className="searchResult-item"
                  onClick={() => handleClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h2>{movie.title}</h2>
                </div>
              ))
            ) : (
              <p>No results found for "{query}"</p>
            )}
          </div>
          {searchData?.results?.length > 0&&( <div className="category-page">
            <p
              className="page-nextBrn"
              style={{
                textDecoration: pageNo > 1 ? "underline" : "none",
                cursor: pageNo < 2 && "default",
              }}
              onClick={() => handlePage("prev")}
            >
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                style={{
                  fontSize: "2rem",
                  color: pageNo > 1 ? "white" : "#ffffff52",
                }}
              />
            </p>
            <p className="page_num">{page}</p>
            <p
              className="page_prevBtn"
              style={{
                textDecoration: pageNo < pageLimit ? "underline" : "none",
                cursor: pageNo > pageLimit - 1 && "default",
              }}
              onClick={() => handlePage("next")}
            >
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                style={{
                  fontSize: "2rem",
                  color: pageNo < pageLimit ? "white" : "#ffffff52",
                }}
              />
            </p>
          </div>)}
        </div>
      )}
      <Footer />
    </>
  );
};

export default SearchResultPage;
