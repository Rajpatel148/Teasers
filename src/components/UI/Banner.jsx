import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { imgUrl } from "../../data/constant.data";
import bgImg from "../../assets/bg.webp";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../../api/fetchMovies";
import { VideoPopUpContext } from "../../Context/VideoPopUp.context.jsx";
import VideoPopUp from "./VideoPopUp";

const Banner = ({ movies }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideos, setMovieVideos] = useState([]);
  const { videoPopUpTrigger, setVideoPopUpTrigger } =
    useContext(VideoPopUpContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (movies) {
        sessionStorage.setItem(
          "enteaser_banner_query_data",
          JSON.stringify(movies)
        );

        const index = Math.floor(Math.random() * movies.results.length);

        setMovieDetails(movies.results[index]);

        try {
          const b_movie = await fetchMovieDetails(movies.results[index]);
          setMovieVideos(b_movie.video_list || []);
          setVideoPopUpTrigger(false);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };

    fetchData();
  }, [movies, setVideoPopUpTrigger]);


  const handleInfoClick = async () => {
    sessionStorage.setItem(
      "enteaser_temp_details",
      JSON.stringify(await fetchMovieDetails(movieDetails))
    );

    navigate("/details");
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: movieDetails?.backdrop_path
          ? `url(${imgUrl.w_og + movieDetails.backdrop_path})`
          : `url(${bgImg})`,
      }}
    >
      <div className="banner_main-layer">
        <div className="banner_main-layer_content-layer">
          <div className="banner_main-layer_content-layer_content">
            <h1 className="banner_main-layer_content-layer_content-title">
              {movieDetails ? movieDetails.title || movieDetails.name : ""}
            </h1>

            <div className="banner_main-layer_content-layer_content_btn">
              <button
                className="banner_main-layer_content-layer_content_btn-play"
                onClick={() => setVideoPopUpTrigger(true)}
              >
                <FontAwesomeIcon icon={faPlay} /> Watch
              </button>
              <button
                className="banner_main-layer_content-layer_content_btn-moreinfo"
                onClick={handleInfoClick}
              >
                <FontAwesomeIcon icon={faCircleInfo} /> More Info
              </button>
            </div>

            <div className="banner_main-layer_content-layer_content-desc">
              <p className="banner_main-layer_content-layer_content-desc-text">
                {movieDetails ? movieDetails.overview : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="banner_main-layer_fade-bottom-layer"></div>
      </div>
      {videoPopUpTrigger && <VideoPopUp banner b_movieDetails={movieVideos} />}
    </div>
  );
};

export default Banner;
