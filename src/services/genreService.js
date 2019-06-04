import http from "./httpService";

const genreApiEndpoint = "/genres";

export function getGenres() {
  return http.get(genreApiEndpoint);
}
