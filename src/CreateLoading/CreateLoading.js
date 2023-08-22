import React from "react";
import Lottie from "react-lottie";
import animationData from "./create.json";

export default function CreateLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        {" "}
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
}
