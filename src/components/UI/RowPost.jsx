import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovies } from "../../api/fetchMovies";
import { imgUrl } from "../../data/constant.data";
import { BeatLoader } from "react-spinners";
import './RowPost.css';

const RowPost = ({ category, w_sm }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ value: false, movieId: "" });

  const { data: rowMovies, isLoading } = useQuery({
    queryKey: [category.id],
    queryFn: () => fetchMovies(category.url),
    staleTime:600*1000, // 10 minutes`
  });

  const handleMovieDetails = async (movie)=>{
    setLoading({ value: true, movieId: movie.id });
      sessionStorage.setItem("enteaser_temp_details", JSON.stringify(await fetchMovieDetails(movie)));

      setLoading({ value: false, movieId: "" });
      navigate("/details");
  }


  const handleSeeMore = ()=>{
    navigate(`/category/${category.id}/1`);
    window.scrollTo({top: 0});
  }
  if (!isLoading) {
    return (
      <div className="row">
        <div className="heading">
          <h2 className="heading-title">{category.title}</h2>
          <button className="heading-seeMoreBtn" onClick={handleSeeMore}>more</button>
        </div>
        <div className="poster-row">
          {rowMovies?.results.map((obj) => (
            <div className={w_sm ? "poster-sm" : "poster-lg"} key={obj.id} onClick={() => {handleMovieDetails(obj)}}>
              <img
                src={imgUrl.w_200 + obj.poster_path}
                alt={obj.name ?? obj.title}
                className="poster-sm-img poster-lg-img"
              />
              {loading.value && loading.movieId === obj.id && (
                <div className="poster-loading-div">
                  <BeatLoader
                    color="rgb(0, 0, 0)"
                    speedMultiplier={1}
                    size={5}
                    aria-label="Loading Spinner"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default RowPost;
