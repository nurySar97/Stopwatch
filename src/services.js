export const toStopWatch = (time = 1) => {
  let timerCell = 0,
    _time = time;
  return [3600, 60, 1]
    .map((measure) => {
      timerCell = Math.floor(_time / measure).toString();
      _time = _time % measure;
      return timerCell.length < 2 ? "0" + timerCell : timerCell;
    })
    .join(":");
};
