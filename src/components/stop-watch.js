import { interval, scan } from "rxjs";
import { useEffect, useRef, useState } from "react";
import { toStopWatch } from "../services";

const Default = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = interval(1000)
      .pipe(scan((time) => time + 1, 0))
      .subscribe(setTime);

    return () => intervalRef.current.unsubscribe();
  }, []);

  return (
    <main className="stop-watch">
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6 col-lg-4 text-center position-relative">
            <div className="sceleton" />
            <div>{toStopWatch(time)}</div>
          </div>
        </div>

        <div className='text-center mt-5'>
          <button className="btn btn-success btn-lg m-3">Start</button>
          <button className="btn btn-warning btn-lg m-3">Wait</button>
          <button className="btn btn-danger btn-lg m-3">Reset</button>
        </div>
      </div>
    </main>
  );
};

export default Default;
