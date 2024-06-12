import React, { useEffect } from "react";

const HandleSetTimeoutAndInterval = () => {
  useEffect(() => {
    const intervals = [];
    const intervalDuration = 30000;
    const staggerDuration = 1000;

    const createStaggeredInterval = (callback, interval, stagger, index) => {
      const timeout = setTimeout(() => {
        const int = setInterval(callback, interval);
        intervals.push(int);
      }, stagger * index);

      intervals.push(timeout);
    };

    const callbacks = [
      () => console.debug("Hello 1"),
      () => console.debug("Hello 2"),
      () => console.debug("Hello 3"),
      () => console.debug("Hello 4"),
      () => console.debug("Hello 5"),
      () => console.debug("Hello 6"),
      () => console.debug("Hello 7"),
      () => console.debug("Hello 8"),
      () => console.debug("Hello 9"),
      () => console.debug("Hello 10"),
    ];

    callbacks.forEach((callback, index) => {
      createStaggeredInterval(
        callback,
        intervalDuration,
        staggerDuration,
        index,
      );
    });

    return () => {
      intervals.forEach(clearInterval);
      intervals.forEach(clearTimeout);
    };
  }, []);

  return <div>Handle SetTimeout And Interval</div>;
};

export default HandleSetTimeoutAndInterval;
