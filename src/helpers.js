export const formatTime = seconds => {
  let minutes = Math.floor(seconds / 60)
  minutes = (minutes >= 10) ? minutes : '0' + minutes
  seconds = Math.floor(seconds % 60)
  seconds = (seconds >= 10) ? seconds : '0' + seconds
  return minutes + ':' + seconds
}

export const truncateLastChar = string => {
  return string.substring(0, string.length - 1)
}
