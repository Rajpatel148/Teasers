import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (url) => {

  const { data } = await api.get(
    `/${url}&api_key=${API_KEY}`
  );
  return data;
};

export const fetchMovieDetails = async (movie) => {
  try {
    const { data } = await api.get(
      `/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
    );

    const videos = data?.results;
    if (videos?.length > 0) {
      const fileteredVideos = videos.filter((video) =>
        ["Teaser", "teaser", "Trailer", "trailer"].includes(video.type)
      );

      return {
        ...movie,
        video: true,
        video_list: [...fileteredVideos?.reverse()],
      };
    } else {
      return {
        ...movie,
        video: false,
      };
    }
  } catch (error) {
    return {
      ...movie,
      video: false,
    };
  }
};
