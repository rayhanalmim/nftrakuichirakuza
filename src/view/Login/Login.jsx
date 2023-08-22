import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSetState } from "react-use";
import { Button } from "../../components/Button/Primary";
import { AuthContext } from "./context/Auth.context";
const Login = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  console.log(url);
  const initialState = {
    referralCode: url
      ? url
      // : "P1608176W0547883J8380736A6636000J5116400Y6569546O0879009J5447068",
      : "I1014393E3325865J1938521O0979516N8622715V7066070V3757580N1423693",
  };

  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useSetState(initialState);
  const { account, active } = useWeb3React();
  const { t } = useTranslation();
  useEffect(() => {
   console.log(loginError)
  }, [loginError]);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("in this");
    console.log(isLoggedIn);
    const { referralCode } = state;
    console.log(referralCode);
    login(referralCode);
    setState({
      referralURL: "",
    });
  };

  return (
    <div className="bg-hero-img bg-cover bg-no-repeat py-5">
      <div className=" md:py-[5rem] py-[3rem]  px-5">
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
                      title={t("Submit")}
                      className="button"
                      defaultValue={t("Sign In")}
                    />
                  </div>
                  <div className="hr" style={{ margin: "40px 0" }} />
                  <div className="foot-lnk">
                    {isLoginPending && <div>Please wait...</div>}
                    {isLoggedIn && <div>Success.</div>}
                    {loginError && <div>{loginError.message}</div>}
                  </div>
                </div>
              </form>

              <div className="sign-up-htm mt-2">
                <div className="group">
                  <label htmlFor="user" className="label pb-2 text-white ">
                    Username
                  </label>
                  <input id="user" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label pb-2 text-white ">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label pb-2 text-white ">
                    Repeat Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label pb-2 text-white ">
                    Refferal code
                  </label>
                  <div className="flex justify-between w-full border p-2  border-[#ccc] rounded-lg ">
                    <h5 className="text-grey">0xfDB86...BFDA</h5>
                    <h6 className="mb-0 text-grey">copy</h6>
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label pb-2 text-white ">
                    Email Address
                  </label>
                  <input id="pass" type="text" className="input" />
                </div>
                <div className="text-center">
                  <Button
                    title="Submit"
                    className="button"
                    defaultValue="Sign In"
                  />
                </div>
                <div className="hr" />
                <div className="foot-lnk">
                  <label
                    htmlFor="tab-1 text-white "
                    style={{ color: "#57466b" }}
                  >
                    Already Member?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
