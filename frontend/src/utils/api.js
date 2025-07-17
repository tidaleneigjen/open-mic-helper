import axiosInstance from "./axiosInstance";

export const fetchSets = () => axiosInstance.get("/sets/");
export const fetchSongs = () => axiosInstance.get("/songs/");

export const addSong = (songData) => axiosInstance.post("/songs/", songData);

export const loginUser = (credentials) =>
  axiosInstance.post("token/", credentials);


