export const getDurationInMinutes = (durationString = "") => {
  const duration = { hours: 0, minutes: 0, seconds: 0 };
  const durationParts = durationString
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");

  if (durationParts.length === 3) {
    duration["hours"] = durationParts[0];
    duration["minutes"] = durationParts[1];
    duration["seconds"] = durationParts[2];
  }

  if (durationParts.length === 2) {
    duration["minutes"] = durationParts[0];
    duration["seconds"] = durationParts[1];
  }

  if (durationParts.length === 1) {
    duration["seconds"] = durationParts[0];
  }

  const totalDurationInMinutes =
    parseInt(duration.hours) * 3600 +
    parseInt(duration.minutes) * 60 +
    parseInt(duration.seconds);

  return totalDurationInMinutes;
};

export const getYoutubeVideoID = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const totalDuration = (duration) => {
  let res = "";
  let hours = parseInt(duration / 3600);
  if (hours !== 0) {
    res += hours + " hr(s) ";
  }
  let mins = parseInt((duration % 3600) / 60);
  if ((duration % 3600) % 60 >= 30) {
    mins++;
  }
  res += mins + " min(s)";
  return res;
};

export const totalDurationWithColon = (duration) => {
  let res = "";
  let hours = parseInt(duration / 3600);
  if (hours !== 0) {
    res += hours + ":";
  }

  duration = duration % 3600;

  let mins = parseInt(duration / 60);

  if (mins >= 10) res += mins + ":";
  else res += "0" + mins + ":";

  let secs = duration % 60;

  if (secs >= 10) res += secs;
  else res += "0" + secs;

  return res;
};
