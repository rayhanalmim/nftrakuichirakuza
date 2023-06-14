import React from "react";
import Lottie from "react-lottie";
import animationData from "./reward.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Reward() {
  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        {" "}
        <Lottie options={defaultOptions} width={500} height={500} />
      </div>
    </div>
  );
}

export default Reward;
