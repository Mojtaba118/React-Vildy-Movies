import http from "./httpService";

const userApiEndpoint = "/users";

export function register(user) {
  return http.post(userApiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
