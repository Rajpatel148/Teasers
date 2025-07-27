import React, { useContext, useState } from "react";
import { VideoPopUpContext } from "../../Context/VideoPopUp.context";
import "./VideoPopUp.css";
import { BeatLoader } from "react-spinners";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleXmark,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAnglesLeft,
  faAnglesRight,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const VideoPopUp = ({ banner, b_movieDetails }) => {
  const [movieDetails] = useState(
    JSON.parse(sessionStorage.getItem("enteaser_temp_details"))
  );
  const { setVideoPopUpTrigger } = useContext(VideoPopUpContext);
  const [videoData] = useState(
    banner ? b_movieDetails : movieDetails?.video_list
  );
  const [videoDataLen] = useState(videoData?.length);
  const [count, setCount] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlistOrder, setPlaylistOrder] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Control btn handling functions
  const handleVideoCount = (dir) => {
    if (dir === "next") setCount((count) => ++count);
    else if (dir === "prev") setCount((count) => --count);
  };

  const handlePlaylistVideo = (item) => {
    videoData.forEach((data) => {
      if (data === item) {
        setCount(videoData.indexOf(data));
      }
    });
  };

  const handlePlaylistOrder = () => {
    videoData.reverse();
    setCount(0);
    setPlaylistOrder((prev) => !prev);
  };
  return (
    <>
      <div className={`videoBgShade_${banner ? "banner" : "movieDetails"}`}>
        {videoData && (
          <div className="videoFrame">
            <BeatLoader
              color="rgba(255, 255, 255, 0.8)"
              loading={!isVideoReady}
              speedMultiplier={1.2}
              size={10}
              aria-label="Loading Spinner"
              cssOverride={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${videoData[count]?.key}`}
              width="100%"
              height="100%"
              controls
              playing
              onReady={() => setIsVideoReady(true)}
              onEnded={() =>
                count < videoDataLen - 1 && setCount((count) => ++count)
              }
            />
          </div>
        )}

        {/* Control btns */}
        <div className="videoControlBtns">
          {/* Previous btn */}
          {count > 0 && (
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="videoBackBtn"
              onClick={() => handleVideoCount("prev")}
            />
          )}

          {/* Close btn */}
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="videoCloseBtn"
            onClick={() => setVideoPopUpTrigger(false)}
          />

          {/* Next btn */}
          {count < videoDataLen - 1 && (
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              className="videoNextBtn"
              onClick={() => handleVideoCount("next")}
            />
          )}
        </div>

        {/* Playlist Control */}
        <div
          className="videoPlaylistContainer"
          style={{
            transform: showPlaylist ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div
            className="semiCircleBtn"
            onClick={() => setShowPlaylist((prev) => !prev)}
          >
            <FontAwesomeIcon
              className="arrowLeftRight"
              icon={showPlaylist ? faAnglesRight : faAnglesLeft}
            />
          </div>

          <div className="videoPlayList">
            <div className="playlistHeader">
              <h3 className="playlistHeader_title">Video Playlist</h3>
              <button
                className="video_dateOrderBtn"
                onClick={() => handlePlaylistOrder()}
              >
                Latest
                <FontAwesomeIcon
                  icon={playlistOrder ? faArrowUp : faArrowDown}
                />
              </button>
            </div>
            {videoData &&
              videoData.map((item) => (
                <div className="videoItem" key={item.key}>
                  <div
                    className="video_preview"
                    style={{
                      backgroundColor: `${
                        videoData[count] === item
                          ? "rgb(40, 40, 40)"
                          : "transparent"
                      }`,
                    }}
                    onClick={() => handlePlaylistVideo(item)}
                  >
                    <p className="video_number">
                      {videoData.indexOf(item) + 1}
                    </p>
                    <img
                      className="video_thumbnail"
                      src={`https://img.youtube.com/vi/${item.key}/default.jpg`}
                      alt="video Thumbnail"
                    />
                    <div className="video_properties">
                      <h4 className="video_title">{item.name}</h4>
                      <p className="video_type">Video Type : {item.type}</p>
                      <p className="video_date">
                        Published at{" "}
                        {new Date(item.published_at)
                          .toLocaleString()
                          .slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPopUp;
