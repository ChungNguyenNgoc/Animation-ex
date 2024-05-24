import React, { useState, useCallback } from "react";

const Button = React.memo(({ onClick }) => {
  console.log("Button re-rendered");
  return <button onClick={onClick}>Increment</button>;
});

const Counter = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const increment = useCallback(() => {
    console.log("1");
    setCount((prevCount) => prevCount + multiplier);
  }, [multiplier]);
  console.log("2");
  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={increment} />
      <br />
      <input
        type="number"
        value={multiplier}
        onChange={(e) => setMultiplier(Number(e.target.value))}
      />
    </div>
  );
};

export default Counter;
