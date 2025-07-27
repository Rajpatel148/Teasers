import React, { createContext, useState } from "react";

export const VideoPopUpContext = createContext({});

const VideoPopUpContextProvider = (props) => {
  const [videoPopUpTrigger, setVideoPopUpTrigger] = useState(false);

  return (
    <VideoPopUpContext.Provider
      value={{ videoPopUpTrigger, setVideoPopUpTrigger }}
    >
      {props.children}
    </VideoPopUpContext.Provider>
  );
};

export default VideoPopUpContextProvider;
