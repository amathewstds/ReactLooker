import React, { useState, useEffect } from "react";

const Test = () => {
  console.log("Test");
  const [test, setTest] = useState();
  useEffect(() => {
    getTest();
  }, []);
  const getTest = async () => {
    console.log("getTest");
    const resp = await fetch("/api/token");
    const data = await resp.json();

    console.log({ resp });
    console.log({ data });

    setTest(data);
  };

  useEffect(() => {
    console.log({ test });
  }, [test]);
  return (
    <div>
      <code style={{ textWrap: "pre" }}>{JSON.stringify(test, null, 2)}</code>
    </div>
  );
};
export default Test;
