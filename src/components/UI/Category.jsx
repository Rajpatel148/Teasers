import axios from "axios";
import React, { useEffect, useState } from "react";
import { category as categoryData } from "../../data/category.data";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, fetchMovieDetails } from "../../api/fetchMovies";
import { PropagateLoader } from "react-spinners";
import { imgUrl } from "../../data/constant.data";
import "./Category.css";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = () => {
  const navigate = useNavigate();
  const { categoryID, page } = useParams();
  const pageLimit = 20;
  let [pageNo, setPageNo] = useState(1);
  let category = "";
  for (const key in categoryData) {
    if (Object.hasOwnProperty.call(categoryData, key)) {
      const element = categoryData[key];
      if (element.id === categoryID) category = element;
    }
  }

  //   Fetching data
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", categoryID, page],
    queryFn: async () => {
      const { data } = await api.get(
        `/${category.url}&api_key=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&page=${page}`
      );
      return data;
    },
  });

  useEffect(() => {
    setPageNo(page);
  }, [page]);

  //   Handle movie details
  const handleMovieDetails = async (movie) => {
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
    navigate(`/category/${categoryID}/${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageNo(newPage);
  };
  //   Loading is here
  if (isLoading) {
    return (
      <div className="category">
        <PropagateLoader
          color="rgb(192, 0, 16)"
          loading={isLoading}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }
  if (!isLoading) {
    return (
      <div className="category">
        <div className="cateogyr-title">{category.title}</div>
        <div className="category-movies">
          {movies?.results.map((movie, i) => (
            <div className="category-movies-movie" key={i}>
              <img
                className="movie--img"
                src={imgUrl.w_200 + movie.poster_path}
                alt={movie.name ?? movie.title}
                onClick={() => handleMovieDetails(movie)}
              />
            </div>
          ))}
        </div>

        <div className="category-page">
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
              cursor: pageNo > pageLimit - 1  && "default",
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
        </div>
      </div>
    );
  }
};

export default Category;
