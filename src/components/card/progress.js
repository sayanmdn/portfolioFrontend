import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function CustomProgressBar() {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const duration = 10000; // 10 seconds in milliseconds
    const interval = 100; // Update the progress every 100 milliseconds
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = (step / steps) * 100;
      setNow(progress);

      if (progress >= 100) {
        clearInterval(timer);
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ProgressBar
      now={now}
      label={`${now.toFixed(2)}%`}
      visuallyHidden={false}
      style={{ width: "100%" }} // Force the progress bar to fill the entire width
    />
  );
}

export default CustomProgressBar;
