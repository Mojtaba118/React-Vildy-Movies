import Raven from "raven-js";
function init() {
  Raven.config("https://deebd810aeb345bfa660bd2f8cb937fb@sentry.io/1473661", {
    release: "0.1.0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}
export default {
  init,
  log
};
