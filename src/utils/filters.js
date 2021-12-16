export function formatDuration(duration) {
  let seconds = Math.round(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  return `${minutes}:${seconds}`;
}

export function formatCount(count) {
  if (count >= 10000) {
    return `${Math.ceil(count / 10000)}万`;
  } else {
    return count;
  }
}

export function formatDate(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month > 9 ? month : "0" + month}-${
    day > 9 ? day : "0" + day
  }`;
}

export function formatPrice(price) {
  if (price % 100 != 0) {
    return (price / 100).toFixed(1);
  } else {
    return price / 100;
  }
}
