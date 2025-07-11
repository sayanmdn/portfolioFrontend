import React, { useState, useEffect } from "react";

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
    <div className="w-full h-full bg-surface-glass rounded-full overflow-hidden">
      <div 
        className="h-full bg-accent-gradient transition-all duration-100 ease-out rounded-full"
        style={{ width: `${now}%` }}
      >
        <span className="sr-only">{now.toFixed(2)}%</span>
      </div>
    </div>
  );
}

export default CustomProgressBar;
