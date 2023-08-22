import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useSetState } from "react-use";
import Swal from "sweetalert2";
import { signUp } from "../../../graphql/mutations/signUp";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { signIn } from "../../../graphql/queries/signIn";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
};

export const ContextProvider = (props) => {
  const [state, setState] = useSetState(initialState);

  const [signUpUser] = useMutation(signUp);
  const [signInUser] = useLazyQuery(signIn);

  const { account } = useWeb3React();

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });

  const login = (refferal) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(refferal, account, signUpUser, signInUser, (error) => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);

        localStorage.setItem(
          "loggedIn",
          JSON.stringify({
            wallet: account,
          })
        );
      } else {
        setLoginError(error);
      }
    });
  };

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// fake login
const fetchLogin = (refferal, account, signUpUser, signInUser, callback) =>
  setTimeout(() => {
    if (refferal) {
      console.log(refferal);
      signInUser({
        variables: {
          wallet: account,
          referral_url: refferal,
        },
      })
        .then((res) => {
          if (res.data.signIn == null) {
            signUpUser({
              variables: {
                wallet: account,
                referralUrl: refferal,
              },
            })
              .then((res) => {
                console.log(res);

                return callback(null);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("User Exist");
            return callback(null);
            return callback(new Error("User Already Exist!"));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return callback(new Error("Input Referral Code"));
    }
  }, 1000);
