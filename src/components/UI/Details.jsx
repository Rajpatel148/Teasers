import React, { useContext, useEffect, useState } from "react";
import { imgUrl } from "../../data/constant.data";
import "./Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { VideoPopUpContext } from "../../Context/VideoPopUp.context";
import VideoPopUp from "./VideoPopUp";
import { useNavigate } from "react-router-dom";

const Details = () => {

  const navigate = useNavigate();

  const [movieDetails] = useState(
    JSON.parse(sessionStorage.getItem("enteaser_temp_details"))
  );

  const {videoPopUpTrigger , setVideoPopUpTrigger} = useContext(VideoPopUpContext)

  const date = new Date(
    movieDetails?.release_date ?? movieDetails?.first_air_date
  )
    .toString()
    .slice(4, 15)
    .split(" ");
  const formatedDate = `${date[0]} ${date[1]}, ${date[2]}`;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  window.onpopstate = function (){
    videoPopUpTrigger && navigate(1);
  }

  return (
    <div
      className="parentDivMovieDetails"
      style={{
        backgroundImage: `url(${imgUrl.w_og + movieDetails?.backdrop_path})`,
      }}
    >
      <div className="shadeDiv">
        <div className="flex-div"></div>
        <div className="movieContent">
          <div className="sidePoster">
            <img
              className="sideImg"
              src={imgUrl.w_og + movieDetails?.poster_path}
              alt="Movie Poster"
            />
          </div>
          <div className="movieDetails">
            <h1 className="title">
              {movieDetails?.name || movieDetails?.title}
            </h1>
            <br />
            <p className="overview">{movieDetails?.overview}</p>
            <br />
            <p>
              {(movieDetails?.release_date || movieDetails?.first_air_date) &&
                `Release Date: ${formatedDate}`}
            </p>
            <p>{movieDetails?.vote_average && `Rating (Avg) : ${movieDetails?.vote_average} / 10`}</p>
            <br />
            {movieDetails?.video && (
               <button className="teaserWatchBtn">
                    <FontAwesomeIcon className="youtubeIcon" icon={faYoutube} onClick={()=>setVideoPopUpTrigger(true)} /> Watch
               </button>
            )}
          </div>
        </div>
      </div>
      {videoPopUpTrigger && <VideoPopUp />}
    </div>
  );
};

export default Details;
