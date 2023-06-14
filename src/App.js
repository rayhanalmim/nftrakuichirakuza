import "./App.css";
import Routing from "./routes/Routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
// import HomePage from "./view/HomePage";
import "antd/dist/antd.css";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //   });
  // }, []);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
