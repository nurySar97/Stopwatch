import {
  buffer,
  debounceTime,
  filter,
  fromEvent,
  interval,
  map,
  scan,
} from "rxjs";
import { useRef, useState, useEffect } from "react";
import { toStopWatch } from "../services";

const Default = () => {
  const [seconds, setSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef(null);
  const waitButton = useRef(null);

  const subscribeToTimer = (initSeconds = 0) => {
    intervalRef.current = interval(1000)
      .pipe(scan((time) => time + 1, initSeconds))
      .subscribe(setSeconds);
  };

  const unSubscribeToTimer = () => {
    if (intervalRef.current) {
      intervalRef.current.unsubscribe();
      intervalRef.current = null;
    }
  };

  const onHandleStart = () => {
    setSeconds(0);
    setIsStarted(true);
    subscribeToTimer();
  };

  const onHandleStop = () => {
    setSeconds(0);
    setIsStarted(false);
    unSubscribeToTimer();
  };

  const onHandleReset = () => {
    setIsStarted(true);
    setSeconds(0);
    unSubscribeToTimer();
    subscribeToTimer();
  };

  useEffect(() => {
    const $waitBtn = fromEvent(waitButton.current, "click");
    const $buffer = $waitBtn.pipe(debounceTime(300));

    const $subscribeWaitdBtn = $waitBtn
      .pipe(
        buffer($buffer),
        map((list) => list.length),
        filter((x) => x === 2)
      )
      .subscribe(() => {
        if (intervalRef.current) {
          setIsStarted(false);
          unSubscribeToTimer();
        }
      });
    return () => $subscribeWaitdBtn.unsubscribe();
  }, []);

  return (
    <main className="stop-watch">
      <div className="container p-3">
        <h1>Stopwatch</h1>
        <hr />
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-4 col-lg-4 col-xl-3 text-center position-relative">
            <div className="sceleton" />
            <div>{toStopWatch(seconds)}</div>
          </div>
        </div>

        <div className="text-center mt-5">
          {isStarted ? (
            <button
              className="btn btn-danger btn-lg m-3"
              onClick={onHandleStop}
            >
              Stop
            </button>
          ) : (
            <button
              className="btn btn-success btn-lg m-3"
              onClick={onHandleStart}
            >
              Start
            </button>
          )}
          <button className="btn btn-warning btn-lg m-3" ref={waitButton}>
            Wait
          </button>
          <button className="btn btn-info btn-lg m-3" onClick={onHandleReset}>
            Reset
          </button>
        </div>
      </div>
    </main>
  );
};

export default Default;
