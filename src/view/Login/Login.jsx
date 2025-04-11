import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSetState } from "react-use";
import { Button } from "../../components/Button/Primary";
import { AuthContext } from "./context/Auth.context";

const Login = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [debugVisible, setDebugVisible] = useState(false);
  const [customAlert, setCustomAlert] = useState(null);

  const initialState = {
    referralCode: url
      ? url
      : "I1014393E3325865J1938521O0979516N8622715V7066070V3757580N1423693",
  };

  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError, debugInfo } = ContextState;
  const [state, setState] = useSetState(initialState);
  const { account, active } = useWeb3React();
  const { t } = useTranslation();

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  useEffect(() => {
    if (loginError) {
      console.log("Login Error:", loginError);

      // Show custom alert for mobile
      if (isMobile()) {
        setCustomAlert({
          type: "error",
          message: loginError.message,
        });
        setDebugVisible(true);
        // Hide after 5 seconds
        setTimeout(() => {
          setCustomAlert(null);
        }, 5000);
      }
    }

    if (isLoggedIn && active && account) {
      // If login successful, navigate to home page
      console.log("Login successful, redirecting...");

      // Show success message on mobile
      if (isMobile()) {
        setCustomAlert({
          type: "success",
          message: "Login successful! Redirecting...",
        });
      }

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [loginError, isLoggedIn, active, account, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { referralCode } = state;
    console.log("Submitting with referral:", referralCode);
    console.log("Active wallet:", active ? "Yes" : "No");
    console.log("Account:", account);

    // Clear any previous alerts
    setCustomAlert(null);

    // Mobile specific checks
    if (isMobile() && !active) {
      setCustomAlert({
        type: "error",
        message: "Wallet not connected. Please connect your wallet first.",
      });
      return;
    }

    // Show attempting login message on mobile
    if (isMobile()) {
      setCustomAlert({
        type: "info",
        message: "Attempting to login...",
      });
    }

    login(referralCode);

    setState({
      referralURL: "",
    });
  };

  // Function to toggle debug panel
  const toggleDebug = () => {
    setDebugVisible(!debugVisible);
  };

  return (
    <div className="bg-hero-img bg-cover bg-no-repeat py-5">
      <div className=" md:py-[5rem] py-[3rem]  px-5">
        {/* Custom Alert for Mobile */}
        {customAlert && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              right: "20px",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor:
                customAlert.type === "error"
                  ? "#ffebee"
                  : customAlert.type === "success"
                  ? "#e8f5e9"
                  : "#e3f2fd",
              color:
                customAlert.type === "error"
                  ? "#d32f2f"
                  : customAlert.type === "success"
                  ? "#388e3c"
                  : "#1976d2",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 9999,
            }}
          >
            {customAlert.message}
          </div>
        )}

        <div className="login-wrap bg-white">
          <div className="login-html">
            <input
              id="tab-1"
              type="radio"
              name="tab"
              className="sign-in"
              defaultChecked
            />
            <label htmlFor="tab-1" className="tab">
              {t("Sign In / Sign Up")}
            </label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" />
            <label htmlFor="tab-2" className="tab"></label>
            <div className="login-form">
              <form onSubmit={onSubmit}>
                <div className="sign-in-htm mt-[3rem]">
                  <div className="group">
                    <label htmlFor="user" className="label pb-5 text-white ">
                      {t("Wallet Address")}
                    </label>
                    <input
                      id="user"
                      type="text"
                      disabled
                      placeholder={active ? account : "Please Connect Wallet"}
                      onChange={(e) => setState({ username: account })}
                      className="input"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="pass" className="label pb-5 text-white ">
                      {t("referral URL")}
                    </label>
                    <input
                      id="pass"
                      type="text"
                      className="input"
                      disabled="true"
                      placeholder={
                        url
                          ? url
                          : "I1014393E3325865J1938521O0979516N8622715V7066070V3757580N1423693"
                      }
                      onChange={(e) =>
                        setState({
                          referralCode:
                            "I1014393E3325865J1938521O0979516N8622715V7066070V3757580N1423693",
                        })
                      }
                    />
                  </div>
                  <div className="group my-5">
                    <input
                      id="check"
                      type="checkbox"
                      className="check my-10"
                      defaultChecked
                    />
                  </div>
                  <div className="text-center mt-10">
                    <Button
                      title={isLoginPending ? t("Processing...") : t("Submit")}
                      className="button"
                      defaultValue={t("Sign In")}
                      disabled={!active || isLoginPending}
                    />
                  </div>
                  <div className="hr" style={{ margin: "40px 0" }} />
                  <div className="foot-lnk">
                    {isLoginPending && (
                      <div>
                        Please wait... <small>(Connecting to wallet)</small>
                      </div>
                    )}
                    {isLoggedIn && <div>Success. Redirecting you...</div>}
                    {loginError && (
                      <div style={{ color: "red" }}>
                        Error: {loginError.message}
                      </div>
                    )}

                    {/* Debug toggle button - hidden in production */}

                    {/* <div style={{ marginTop: "20px" }}>
                      <button
                        type="button"
                        onClick={toggleDebug}
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          fontSize: "12px",
                        }}
                      >
                        {debugVisible ? "Hide Debug Info" : "Show Debug Info"}
                      </button>
                    </div> */}

                    {/* Debug information panel */}
                    {debugVisible && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "10px",
                          backgroundColor: "#f5f5f5",
                          color: "#333",
                          textAlign: "left",
                          fontSize: "12px",
                          overflow: "auto",
                          maxHeight: "200px",
                        }}
                      >
                        <h4>Debug Information:</h4>
                        <p>Device: {isMobile() ? "Mobile" : "Desktop"}</p>
                        <p>Active: {active ? "Yes" : "No"}</p>
                        <p>Account: {account || "Not connected"}</p>
                        <p>Login Pending: {isLoginPending ? "Yes" : "No"}</p>
                        <p>Logged In: {isLoggedIn ? "Yes" : "No"}</p>
                        <p>Error: {loginError ? loginError.message : "None"}</p>
                        <pre>{debugInfo}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </form>

              {/* Rest of the component remains the same */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
