export const toStopWatch = (time = 1) => {
  let result = 0,
    _time = time;
  return [3600, 60, 1]
    .map((measure) => {
      result = Math.floor(_time / measure).toString();
      _time = _time % measure;
      return result.length < 2 ? `0${result}` : result;
    })
    .join(":");
};
